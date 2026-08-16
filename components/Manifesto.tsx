export default function Manifesto() {
  return (
    <section className="relative py-28 md:py-36 px-6 md:px-12 z-10 overflow-hidden border-y border-[var(--border)]">
      <div className="absolute inset-0 dot-pattern opacity-40" />
      <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-[var(--accent)]/5 blur-3xl" />
      <div className="absolute -bottom-20 -left-20 w-96 h-96 rounded-full bg-[var(--accent-2)]/5 blur-3xl" />
      <div className="max-w-5xl mx-auto text-center relative">
        <p className="text-2xl md:text-4xl lg:text-5xl leading-tight font-serif italic manifesto-quote reveal">
          &ldquo;Software is no longer just about executing instructions.
          It&apos;s about building{" "}
          <span className="text-[var(--accent)] not-italic font-display font-bold">
            agents that reason
          </span>
          , retrieve context, and{" "}
          <span className="text-[var(--accent-2)] not-italic font-display font-bold">
            take action
          </span>{" "}
          on our behalf.&rdquo;
        </p>
        <div className="mt-10 font-mono text-xs text-[var(--muted)] tracking-widest reveal reveal-d1">
          — The Internet, allegedly
        </div>
      </div>
    </section>
  );
}
