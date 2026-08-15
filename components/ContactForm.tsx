"use client";

import { useState, FormEvent } from "react";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/mnpazwbk";

type Status = "idle" | "submitting" | "success" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });

      if (res.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="border border-[var(--border)] rounded-2xl p-8 text-center">
        <i className="fas fa-circle-check text-3xl text-[var(--accent)] mb-4" />
        <p className="text-lg font-medium">Message sent.</p>
        <p className="text-[var(--muted)] text-sm mt-2">
          Thanks for reaching out — I&apos;ll get back to you soon.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-6 text-sm text-[var(--accent)] ul-link"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="border border-[var(--border)] rounded-2xl p-6 md:p-8 text-left space-y-5"
    >
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label
            htmlFor="name"
            className="block font-mono text-xs text-[var(--muted)] tracking-wider mb-2"
          >
            NAME
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            required
            className="w-full bg-[var(--bg-2)] border border-[var(--border)] focus:border-[var(--accent)] rounded-xl px-4 py-3 text-[var(--fg)] outline-none transition-colors"
            placeholder="Your name"
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block font-mono text-xs text-[var(--muted)] tracking-wider mb-2"
          >
            EMAIL
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="w-full bg-[var(--bg-2)] border border-[var(--border)] focus:border-[var(--accent)] rounded-xl px-4 py-3 text-[var(--fg)] outline-none transition-colors"
            placeholder="you@example.com"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="message"
          className="block font-mono text-xs text-[var(--muted)] tracking-wider mb-2"
        >
          MESSAGE
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="w-full bg-[var(--bg-2)] border border-[var(--border)] focus:border-[var(--accent)] rounded-xl px-4 py-3 text-[var(--fg)] outline-none transition-colors resize-none"
          placeholder="What are you working on?"
        />
      </div>

      {status === "error" && (
        <p className="text-sm text-[var(--accent-2)]">
          Something went wrong — please try again or email me directly.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="magnetic group w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-[var(--accent)] text-[var(--bg)] rounded-full font-semibold hover:bg-[var(--fg)] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        <span>{status === "submitting" ? "Sending..." : "Send message"}</span>
        {status !== "submitting" && (
          <i className="fas fa-arrow-right group-hover:translate-x-1 transition-transform" />
        )}
      </button>
    </form>
  );
}