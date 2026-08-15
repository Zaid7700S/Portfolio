"use client";

import Counter from "./Counter";

const stats = [
  { target: 4, suffix: "", label: "SEMESTER COMPLETED" },
  { target: 5, suffix: "+", label: "PROJECTS SHIPPED" },
  { target: 3, suffix: "", label: "AI AGENTS BUILT" },
  { target: 9, suffix: "", label: "CORE TECH STACK" },
];

export default function About() {
  return (
    <section id="about" className="relative px-6 md:px-12 py-24 md:py-32 z-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 font-mono text-xs text-[var(--muted)] mb-14 reveal">
          <span className="section-num">02 / ABOUT</span>
          <span className="w-10 h-px bg-[var(--border)]" />
          <span>WHO I AM</span>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-7 space-y-7 reveal">
            <h2 className="text-4xl md:text-6xl font-bold leading-[0.95]">
              Engineering smart systems
              <br />
              <span className="font-serif italic text-[var(--muted)]">
                one agent
              </span>{" "}
              at
              <br />a <span className="text-[var(--accent)]">time</span>.
            </h2>
            <div className="space-y-4 text-[var(--muted)] text-base md:text-lg leading-relaxed max-w-2xl">
              <p>
                I&apos;m a 4th-semester Software Engineering student at
                Superior University with a deep interest in Agentic AI, RAG
                architectures, and scalable full-stack development. My
                journey started with frontend and mobile apps, but quickly
                evolved into building intelligent systems using LangChain and
                LangGraph.
              </p>
              <p>
                I believe the future of software lies in autonomous agents
                that don&apos;t just answer queries, but take action. When
                I&apos;m not studying for exams, I&apos;m building
                multi-agent workflows, experimenting with vector databases,
                or shipping full-stack e-commerce platforms from scratch.
              </p>
            </div>
            <div className="pt-3 flex flex-wrap gap-2.5">
              <span className="chip">Agentic AI</span>
              <span className="chip">Full-Stack</span>
              <span className="chip">RAG Systems</span>
              <span className="chip">Python</span>
              <span className="chip">React/.NET</span>
            </div>
          </div>

          <div className="lg:col-span-5 grid grid-cols-2 gap-4 reveal reveal-d1">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="border border-[var(--border)] rounded-2xl p-6 hover:border-[var(--accent)] hover:bg-[var(--bg-2)] transition-all"
              >
                <Counter target={stat.target} suffix={stat.suffix} />
                <div className="text-[var(--muted)] text-xs mt-3 font-mono tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20 border-t border-[var(--border)] pt-12 reveal">
          <div className="flex items-center gap-3 mb-8">
            <div className="relative w-2 h-2">
              <div className="pulse-ring absolute inset-0" />
              <div className="absolute inset-0 rounded-full bg-[var(--accent)]" />
            </div>
            <span className="font-mono text-xs text-[var(--muted)] tracking-widest">
              CURRENTLY
            </span>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="text-[var(--muted)] text-xs font-mono mb-2 tracking-wider">
                BUILDING
              </div>
              <p className="text-lg leading-snug">
                Multi-agent business plan generators using LangGraph and
                state machines.
              </p>
            </div>
            <div>
              <div className="text-[var(--muted)] text-xs font-mono mb-2 tracking-wider">
                LEARNING
              </div>
              <p className="text-lg leading-snug">
                Advanced prompt engineering, vector databases, and NoSQL
                scaling patterns.
              </p>
            </div>
            <div>
              <div className="text-[var(--muted)] text-xs font-mono mb-2 tracking-wider">
                STUDYING
              </div>
              <p className="text-lg leading-snug">
                4th Semester Software Engineering at Superior University,
                Lahore.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
