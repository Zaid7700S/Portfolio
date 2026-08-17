import { NextRequest } from "next/server";
import { buildSystemPrompt } from "@/lib/chatbot-context";

export const runtime = "nodejs";

const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
const MODEL = "openai/gpt-oss-120b";

// --- Simple in-memory rate limiting ---
// Good enough for a portfolio site's traffic. Resets on cold start / deploy,
// and won't be perfectly accurate across multiple serverless instances —
// if this ever needs to be bulletproof, swap for Upstash Redis rate limiting.
const RATE_LIMIT = 15; // messages
const RATE_WINDOW_MS = 60 * 60 * 1000; // per hour, per IP
const MAX_MESSAGE_LENGTH = 500; // characters
const MAX_HISTORY_MESSAGES = 12; // cap how much conversation history is sent

const requestLog = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = (requestLog.get(ip) ?? []).filter(
    (t) => now - t < RATE_WINDOW_MS
  );
  if (timestamps.length >= RATE_LIMIT) {
    requestLog.set(ip, timestamps);
    return true;
  }
  timestamps.push(now);
  requestLog.set(ip, timestamps);
  return false;
}

type ChatMessage = { role: "user" | "assistant"; content: string };

// Retries once with a longer connect timeout — helps with transient network
// issues (VPN/firewall/DNS hiccups reaching Groq's Cloudflare-fronted edge)
// without leaving the request hanging indefinitely.
async function fetchGroqWithRetry(
  payload: object,
  apiKey: string,
  attempts = 2
): Promise<Response> {
  let lastErr: unknown;
  for (let i = 0; i < attempts; i++) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 20000);
    try {
      const res = await fetch(GROQ_API_URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });
      clearTimeout(timeoutId);
      return res;
    } catch (err) {
      clearTimeout(timeoutId);
      lastErr = err;
      if (i < attempts - 1) {
        await new Promise((r) => setTimeout(r, 600));
      }
    }
  }
  throw lastErr;
}

export async function POST(req: NextRequest) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  if (isRateLimited(ip)) {
    return new Response(
      JSON.stringify({
        error: "You've hit the message limit for now — please try again later.",
      }),
      { status: 429, headers: { "Content-Type": "application/json" } }
    );
  }

  let body: { messages?: ChatMessage[] };
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid request body." }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const incoming = Array.isArray(body.messages) ? body.messages : [];

  // Validate + sanitize
  const messages = incoming
    .filter(
      (m) =>
        (m.role === "user" || m.role === "assistant") &&
        typeof m.content === "string" &&
        m.content.trim().length > 0
    )
    .slice(-MAX_HISTORY_MESSAGES)
    .map((m) => ({
      role: m.role,
      content: m.content.slice(0, MAX_MESSAGE_LENGTH),
    }));

  if (messages.length === 0) {
    return new Response(JSON.stringify({ error: "No message provided." }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return new Response(
      JSON.stringify({ error: "Chat is not configured on the server." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }

  const payload = {
    model: MODEL,
    stream: true,
    temperature: 0.5,
    max_tokens: 700,
    messages: [{ role: "system", content: buildSystemPrompt() }, ...messages],
  };

  let groqRes: Response;
  try {
    groqRes = await fetchGroqWithRetry(payload, apiKey);
  } catch (err) {
    console.error("Groq fetch failed after retries:", err);
    return new Response(
      JSON.stringify({
        error:
          "Couldn't reach the assistant right now — please try again in a moment.",
      }),
      { status: 502, headers: { "Content-Type": "application/json" } }
    );
  }

  if (!groqRes.ok || !groqRes.body) {
    const errText = await groqRes.text().catch(() => "");
    console.error("Groq API error:", groqRes.status, errText);
    return new Response(
      JSON.stringify({ error: "The assistant is temporarily unavailable." }),
      { status: 502, headers: { "Content-Type": "application/json" } }
    );
  }

  // Re-stream Groq's SSE response as plain text chunks, so the client
  // doesn't need to parse SSE/JSON deltas itself.
  const reader = groqRes.body.getReader();
  const decoder = new TextDecoder();
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      let buffer = "";
      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });

          const lines = buffer.split("\n");
          buffer = lines.pop() ?? "";

          for (const line of lines) {
            const trimmed = line.trim();
            if (!trimmed.startsWith("data:")) continue;
            const data = trimmed.slice(5).trim();
            if (data === "[DONE]") {
              controller.close();
              return;
            }
            try {
              const parsed = JSON.parse(data);
              const token = parsed?.choices?.[0]?.delta?.content;
              if (token) controller.enqueue(encoder.encode(token));
            } catch {
              // ignore malformed chunk
            }
          }
        }
        controller.close();
      } catch (err) {
        controller.error(err);
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-cache",
    },
  });
}