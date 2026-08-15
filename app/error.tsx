"use client";

import { useEffect } from "react";

import ParticleCanvas from "@/components/ParticleCanvas";
import ScrollProgress from "@/components/ScrollProgress";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GlobalEffects from "@/components/GlobalEffects";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log to your monitoring service of choice if you add one later.
    console.error(error);
  }, [error]);

  return (
    <>
      <div className="noise" />
      <ParticleCanvas />
      <ScrollProgress />
      <Navbar />

      <main>
        <section className="relative min-h-screen flex items-center px-6 md:px-12 pt-32 pb-20 z-10">
          <div className="absolute inset-0 grid-bg opacity-60 pointer-events-none" />
          <div className="max-w-4xl mx-auto w-full relative text-center">
            <div className="flex items-center justify-center gap-3 font-mono text-xs text-[var(--muted)] mb-10">
              <span className="section-num" style={{ color: "var(--accent-2)" }}>
                ERROR
              </span>
              <span className="w-10 h-px bg-[var(--border)]" />
              <span>SOMETHING BROKE</span>
            </div>

            <div className="terminal p-6 md:p-8 max-w-xl mx-auto mb-12 text-left">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                <div className="w-3 h-3 rounded-full bg-[#28c840]" />
                <span className="ml-auto font-mono text-xs text-[var(--muted)]">
                  ~/zaid/runtime.py
                </span>
              </div>
              <pre className="font-mono text-xs md:text-[13px] leading-relaxed text-[var(--fg)] overflow-x-hidden">
                <code>{`>>> render_page()
Traceback (most recent call last):
RuntimeError: something went wrong

status: 500
suggestion: "retry, or go home"`}</code>
              </pre>
            </div>

            <h1 className="text-5xl md:text-8xl font-bold leading-[0.9] mb-6">
              Oops.
              <br />
              <span className="font-serif italic text-[var(--muted)]">
                agent crashed.
              </span>
            </h1>

            <p className="text-[var(--muted)] text-base md:text-lg max-w-xl mx-auto mb-10 leading-relaxed">
              Something unexpected happened on this page. Try again, or head
              back home.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={reset}
                className="magnetic group inline-flex items-center gap-3 px-7 py-4 bg-[var(--accent)] text-[var(--bg)] font-semibold rounded-full"
              >
                <span>Try again</span>
                <i className="fas fa-rotate-right group-hover:rotate-180 transition-transform duration-500" />
              </button>
              <a
                href="/"
                className="px-7 py-4 border border-[var(--border-hi)] hover:border-[var(--fg)] rounded-full transition-colors inline-flex items-center gap-3"
              >
                <span>Back to home</span>
                <i className="fas fa-arrow-right text-xs" />
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <GlobalEffects />
    </>
  );
}