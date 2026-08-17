"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Components } from "react-markdown";

type Message = { role: "user" | "assistant"; content: string };

const GREETING: Message = {
  role: "assistant",
  content:
    "Hey — I'm Zaid's portfolio assistant. Ask me about his projects, skills, or experience.",
};

const SUGGESTIONS = [
  "What has he built?",
  "What's his tech stack?",
  "Tell me about the internship",
  "How do I contact him?",
];

const STORAGE_KEY = "zaid-portfolio-chat";
const MAX_STORED_MESSAGES = 30;

// True for the site's own in-page section anchors (/#work, /#contact, etc.)
// — these should smooth-scroll instead of doing a full navigation.
function isInternalAnchor(href: string | undefined): href is string {
  return !!href && (href.startsWith("/#") || href.startsWith("#"));
}

// True for other internal site paths (e.g. /projects/business-plan) — these
// should navigate within the app (closing the chat) rather than opening in
// a new tab like external links do.
function isInternalPath(href: string | undefined): href is string {
  return !!href && href.startsWith("/") && !href.startsWith("//");
}

export default function ChatTerminal() {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([GREETING]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  function goToSection(href: string) {
    const id = href.replace(/^\/?#/, "");
    setOpen(false);
    if (pathname === "/") {
      // Same page already — smooth scroll without a full navigation.
      // Small delay so the closing chat panel finishes unmounting first.
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
        window.history.pushState(null, "", `#${id}`);
      }, 50);
    } else {
      // On a different route (e.g. /projects) — navigate to the homepage anchor.
      router.push(`/#${id}`);
    }
  }

  const markdownComponents: Components = {
    p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
    strong: ({ children }) => (
      <strong className="text-[var(--fg)] font-semibold">{children}</strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,
    a: ({ href, children }) => {
      if (isInternalAnchor(href)) {
        return (
          <a
            href={href}
            onClick={(e) => {
              e.preventDefault();
              goToSection(href);
            }}
            className="text-[var(--accent)] underline underline-offset-2 hover:text-[var(--fg)] transition-colors cursor-pointer"
          >
            {children}
          </a>
        );
      }
      if (isInternalPath(href)) {
        return (
          <a
            href={href}
            onClick={(e) => {
              e.preventDefault();
              setOpen(false);
              router.push(href);
            }}
            className="text-[var(--accent)] underline underline-offset-2 hover:text-[var(--fg)] transition-colors cursor-pointer"
          >
            {children}
          </a>
        );
      }
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[var(--accent)] underline underline-offset-2 hover:text-[var(--fg)] transition-colors break-all"
        >
          {children}
        </a>
      );
    },
    ul: ({ children }) => (
      <ul className="list-disc pl-4 mb-2 space-y-1">{children}</ul>
    ),
    ol: ({ children }) => (
      <ol className="list-decimal pl-4 mb-2 space-y-1">{children}</ol>
    ),
    li: ({ children }) => <li>{children}</li>,
    code: ({ children }) => (
      <code className="bg-[var(--bg-3)] border border-[var(--border)] rounded px-1 py-0.5 text-[11px] text-[var(--accent)]">
        {children}
      </code>
    ),
    table: ({ children }) => (
      <div className="overflow-x-auto mb-2 rounded-lg border border-[var(--border)]">
        <table className="w-full text-left border-collapse text-[11px]">
          {children}
        </table>
      </div>
    ),
    thead: ({ children }) => (
      <thead className="bg-[var(--bg-3)] text-[var(--fg)]">{children}</thead>
    ),
    th: ({ children }) => (
      <th className="px-2 py-1.5 border-b border-[var(--border)] font-semibold break-words">
        {children}
      </th>
    ),
    td: ({ children }) => (
      <td className="px-2 py-1.5 border-b border-[var(--border)] align-top break-words">
        {children}
      </td>
    ),
    hr: () => <hr className="border-[var(--border)] my-2" />,
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, streaming]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  // Lock page scroll while the chat panel is open — same pattern used by
  // ProjectModal — so wheel/touch scroll doesn't bleed through to the page
  // behind once the message list hits its top or bottom.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Load any saved conversation once, on first mount.
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setMessages(parsed);
        }
      }
    } catch {
      // corrupted or inaccessible storage — just start fresh
    }
  }, []);

  // Persist the conversation whenever it changes.
  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(messages.slice(-MAX_STORED_MESSAGES))
      );
    } catch {
      // storage full or unavailable (e.g. private browsing) — fail silently
    }
  }, [messages]);

  function clearChat() {
    setMessages([GREETING]);
    setError(null);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  }

  async function sendMessage(overrideText?: string) {
    const text = (overrideText ?? input).trim();
    if (!text || streaming) return;

    setError(null);
    const nextMessages: Message[] = [...messages, { role: "user", content: text }];
    setMessages(nextMessages);
    setInput("");
    setStreaming(true);

    // placeholder assistant message we'll stream tokens into
    setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: nextMessages.map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      if (!res.ok || !res.body) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error || "Something went wrong.");
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        setMessages((prev) => {
          const updated = [...prev];
          const last = updated[updated.length - 1];
          updated[updated.length - 1] = {
            ...last,
            content: last.content + chunk,
          };
          return updated;
        });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setMessages((prev) => prev.slice(0, -1)); // drop empty placeholder
    } finally {
      setStreaming(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  }

  return (
    <>
      {/* Launcher */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          aria-label="Open chat with Zaid's portfolio assistant"
          className="fixed bottom-6 right-6 z-[90] flex items-center gap-2.5 px-4 py-3 rounded-full border border-[var(--border-hi)] bg-[var(--bg-2)]/95 backdrop-blur hover:border-[var(--accent)] transition-colors font-mono text-xs tracking-wider group"
        >
          <div className="relative w-1.5 h-1.5">
            <div className="pulse-ring absolute inset-0" />
            <div className="absolute inset-0 rounded-full bg-[var(--accent)]" />
          </div>
          <span className="group-hover:text-[var(--accent)] transition-colors">
            ASK_ZAID.AI
          </span>
        </button>
      )}

      {/* Expanded terminal */}
      {open && (
        <div className="fixed bottom-6 right-6 z-[90] w-[calc(100vw-3rem)] max-w-md">
          <div className="terminal terminal-solid flex flex-col h-[28rem] max-h-[70vh]">
            {/* Header */}
            <div className="flex items-center gap-2 px-5 py-4 border-b border-[var(--border)] shrink-0">
              <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
              <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
              <div className="w-3 h-3 rounded-full bg-[#28c840]" />
              <span className="ml-auto font-mono text-xs text-[var(--muted)]">
                ~/zaid/chat.py
              </span>
              {messages.length > 1 && (
                <button
                  onClick={clearChat}
                  aria-label="Clear conversation"
                  title="Clear conversation"
                  className="ml-3 text-[var(--muted)] hover:text-[var(--accent-2)] transition-colors"
                >
                  <i className="fas fa-rotate-left text-xs" />
                </button>
              )}
              <button
                onClick={() => setOpen(false)}
                aria-label="Close chat"
                className="ml-2 text-[var(--muted)] hover:text-[var(--accent)] transition-colors"
              >
                <i className="fas fa-times text-sm" />
              </button>
            </div>

            {/* Messages */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto overscroll-contain px-5 py-4 space-y-3 font-mono text-xs md:text-[13px] leading-relaxed"
            >
              {messages.map((m, i) => (
                <div key={i}>
                  {m.role === "user" ? (
                    <p className="text-[var(--accent)]">
                      {">>> "}
                      <span className="text-[var(--fg)]">{m.content}</span>
                    </p>
                  ) : (
                    <div className="text-[var(--muted)]">
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={markdownComponents}
                      >
                        {m.content || (streaming && i === messages.length - 1 ? "" : "")}
                      </ReactMarkdown>
                      {streaming && i === messages.length - 1 && (
                        <span className="inline-block w-1.5 h-3.5 bg-[var(--accent)] ml-0.5 align-middle blink-caret" />
                      )}
                    </div>
                  )}
                </div>
              ))}
              {messages.length === 1 && !streaming && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      onClick={() => sendMessage(s)}
                      className="chip cursor-pointer"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
              {error && (
                <p className="text-[var(--accent-2)] text-xs">{error}</p>
              )}
            </div>

            {/* Input */}
            <div className="flex items-center gap-2 px-5 py-4 border-t border-[var(--border)] shrink-0">
              <span className="text-[var(--accent)] font-mono text-xs">{">>>"}</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={streaming}
                maxLength={500}
                placeholder={streaming ? "thinking..." : "Ask about a project..."}
                className="flex-1 bg-transparent font-mono text-base md:text-[13px] text-[var(--fg)] outline-none placeholder:text-[var(--muted-2)] disabled:opacity-50"
              />
              <button
                onClick={() => sendMessage()}
                disabled={streaming || !input.trim()}
                aria-label="Send message"
                className="text-[var(--muted)] hover:text-[var(--accent)] disabled:opacity-30 disabled:hover:text-[var(--muted)] transition-colors"
              >
                <i className="fas fa-arrow-up text-sm" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}