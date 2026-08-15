"use client";

import { useEffect, useState } from "react";

const phrases = [
  `const developer = {
  name: "Zaid Arshad",
  role: "Software Engineer",
  location: "Lahore, Pakistan",
  university: "Superior University",
  semester: 4,
  focus: ["Agentic AI", "Full-Stack"],
  status: "Building with LangGraph"
}`,
  `def create_agent(task: str):
    graph = LangGraph()
    graph.add_node("analyze", llm)
    graph.add_node("execute", tools)
    graph.add_edge("analyze", "execute")
    return graph.compile()`,
  `SELECT name, project, stack
FROM developers
WHERE location = 'Lahore'
  AND focus = 'Agentic AI'
  AND is_student = true
ORDER BY ambition DESC;`,
];

export default function Hero() {
  const [typedText, setTypedText] = useState("");

  useEffect(() => {
    let phraseIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    let timeoutId: ReturnType<typeof setTimeout>;
    let cancelled = false;

    function type() {
      if (cancelled) return;
      const current = phrases[phraseIdx];

      if (!isDeleting) {
        charIdx++;
        setTypedText(current.slice(0, charIdx));
        if (charIdx === current.length) {
          isDeleting = true;
          timeoutId = setTimeout(type, 4500);
          return;
        }
        timeoutId = setTimeout(type, 35 + Math.random() * 40);
      } else {
        charIdx--;
        setTypedText(current.slice(0, charIdx));
        if (charIdx === 0) {
          isDeleting = false;
          phraseIdx = (phraseIdx + 1) % phrases.length;
          timeoutId = setTimeout(type, 600);
          return;
        }
        timeoutId = setTimeout(type, 28);
      }
    }
    type();

    return () => {
      cancelled = true;
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center px-6 md:px-12 pt-32 pb-20 z-10"
    >
      <div className="absolute inset-0 grid-bg opacity-60 pointer-events-none" />
      <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-12 gap-10 lg:gap-8 items-center relative">
        <div className="lg:col-span-7 space-y-7">
          <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-[var(--muted)] reveal">
            <span className="section-num">01 / INTRODUCTION</span>
            <span className="w-10 h-px bg-[var(--border)]" />
            <span>LAHORE, PAKISTAN · 31.52°N</span>
          </div>
          <div className="reveal reveal-d1">
            <p className="text-lg md:text-xl text-[var(--muted)] font-light mb-3 font-mono">
              Hi, I&apos;m
            </p>
            <h1 className="hero-name">
              ZAID
              <br />
              <span className="font-serif italic text-[var(--accent)] glow-text">
                arshad.
              </span>
            </h1>
          </div>
          <p className="text-lg md:text-xl text-[var(--muted)] max-w-xl leading-relaxed reveal reveal-d2">
            Software Engineering student at Superior University building{" "}
            <span className="text-[var(--fg)]">Agentic AI systems</span> and{" "}
            <span className="text-[var(--fg)]">full-stack applications</span>.
            Currently in my 4th semester, crafting everything from RAG
            pipelines to multi-agent workflows.
          </p>
          <div className="flex flex-wrap gap-4 items-center reveal reveal-d3">
            <a
              href="#work"
              className="magnetic group relative px-7 py-4 bg-[var(--accent)] text-[var(--bg)] font-semibold rounded-full overflow-hidden inline-flex items-center gap-3"
            >
              <span className="relative z-10">View selected work</span>
              <i className="fas fa-arrow-right relative z-10 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#contact"
              className="px-7 py-4 border border-[var(--border-hi)] hover:border-[var(--fg)] rounded-full transition-colors inline-flex items-center gap-3"
            >
              <span>Get in touch</span>
              <i className="fas fa-arrow-down text-xs" />
            </a>
            <a href="/resume.pdf"
    target="_blank"
    rel="noopener noreferrer"
    className="px-7 py-4 border border-[var(--border-hi)] hover:border-[var(--accent)] hover:text-[var(--accent)] rounded-full transition-colors inline-flex items-center gap-3"
  >
    <span>Resume</span>
    <i className="fas fa-file-arrow-down text-xs" />
  </a>
          </div>
        </div>

        <div className="lg:col-span-5 reveal reveal-d2">
          <div className="terminal p-6 md:p-7 float">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
              <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
              <div className="w-3 h-3 rounded-full bg-[#28c840]" />
              <span className="ml-auto font-mono text-xs text-[var(--muted)]">
                ~/zaid/profile.py
              </span>
            </div>
            <pre className="font-mono text-xs md:text-[13px] leading-relaxed text-[var(--fg)] min-h-[220px] overflow-x-hidden">
              <code>{typedText}</code>
              <span className="inline-block w-2 h-4 bg-[var(--accent)] ml-0.5 align-middle blink-caret" />
            </pre>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-3 text-[var(--muted)] hidden md:flex">
        <span className="font-mono text-[10px] tracking-widest">SCROLL</span>
        <div className="relative w-px h-12 bg-[var(--border)] overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-3 bg-[var(--accent)] scroll-dot" />
        </div>
      </div>
    </section>
  );
}