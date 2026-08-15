import type { Metadata } from "next";
import Link from "next/link";

import ParticleCanvas from "@/components/ParticleCanvas";
import ScrollProgress from "@/components/ScrollProgress";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GlobalEffects from "@/components/GlobalEffects";

export const metadata: Metadata = {
  title: "Page not found",
  description: "This page doesn't exist — head back to the homepage.",
};

export default function NotFound() {
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
              <span className="section-num">ERROR</span>
              <span className="w-10 h-px bg-[var(--border)]" />
              <span>PAGE NOT FOUND</span>
            </div>

            <div className="terminal p-6 md:p-8 max-w-xl mx-auto mb-12 text-left">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                <div className="w-3 h-3 rounded-full bg-[#28c840]" />
                <span className="ml-auto font-mono text-xs text-[var(--muted)]">
                  ~/zaid/404.py
                </span>
              </div>
              <pre className="font-mono text-xs md:text-[13px] leading-relaxed text-[var(--fg)] overflow-x-hidden">
                <code>{`>>> find_page(url)
Traceback (most recent call last):
PageNotFoundError: route does not exist

status: 404
suggestion: "go home"`}</code>
              </pre>
            </div>

            <h1 className="text-5xl md:text-8xl font-bold leading-[0.9] mb-6">
              404
              <br />
              <span className="font-serif italic text-[var(--muted)]">
                lost in the graph.
              </span>
            </h1>

            <p className="text-[var(--muted)] text-base md:text-lg max-w-xl mx-auto mb-10 leading-relaxed">
              The page you&apos;re looking for doesn&apos;t exist, moved, or
              never did. Let&apos;s get you back on track.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/"
                className="magnetic group inline-flex items-center gap-3 px-7 py-4 bg-[var(--accent)] text-[var(--bg)] font-semibold rounded-full"
              >
                <span>Back to home</span>
                <i className="fas fa-arrow-right group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/projects"
                className="px-7 py-4 border border-[var(--border-hi)] hover:border-[var(--fg)] rounded-full transition-colors inline-flex items-center gap-3"
              >
                <span>View projects</span>
                <i className="fas fa-arrow-up-right-from-square text-xs" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <GlobalEffects />
    </>
  );
}