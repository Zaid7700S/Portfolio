const timeline = [
  {
    dotColor: "bg-[var(--accent)]",
    dotSize: "w-3.5 h-3.5",
    date: "JUN — AUG 2026",
    dateColor: "text-[var(--accent)]",
    title: "Software Engineering Intern",
    org: "GLOSIX SYSTEMS · LAHORE",
    orgColor: "text-[var(--accent-2)]",
    desc: "Three-month internship focused on Agentic AI and full-stack development. Learned LangChain and LangGraph and helped build multi-agent systems, RAG pipelines, and full-stack applications.",
    chips: ["LangGraph", "RAG", "Agentic AI"],
  },
  
  {
    dotColor: "bg-[var(--fg)]",
    dotSize: "w-3.5 h-3.5",
    date: "2026 — PRESENT",
    dateColor: "text-[var(--muted)]",
    title: "Agentic AI & Full-Stack Development",
    org: "SELF-DRIVEN PROJECTS · LAHORE",
    orgColor: "text-[var(--accent-2)]",
    desc: "Deep diving into LangChain and LangGraph. Built a multi-agent business plan generator, a RAG-based document analyzer, and an automated email classifier. Transitioned from traditional web dev to building autonomous AI workflows.",
    chips: ["LangGraph", "RAG", "Agentic AI"],
  },
  {
    dotColor: "bg-[var(--fg)]",
    dotSize: "w-3.5 h-3.5",
    date: "2024 — 2026",
    dateColor: "text-[var(--muted)]",
    title: "BS Software Engineering (Semester 1-3)",
    org: "SUPERIOR UNIVERSITY · LAHORE",
    orgColor: "text-[var(--accent-2)]",
    desc: "Built foundational knowledge in programming, data structures, and databases. Applied academic concepts by building a full-stack e-commerce store and a Flutter-based quiz app. Started exploring Python and AI integrations.",
    chips: ["React", "Node.js", ".NET", "Flutter"],
  },
  {
    dotColor: "bg-[var(--muted)]",
    dotSize: "w-3 h-3",
    date: "2024",
    dateColor: "text-[var(--muted)]",
    title: "Started Software Engineering Degree",
    org: "SUPERIOR UNIVERSITY · LAHORE",
    orgColor: "text-[var(--muted)]",
    desc: "Enrolled at Superior University to formalize my passion for coding. Began learning core computer science concepts alongside modern web frameworks.",
    chips: null,
  },
];

export default function Experience() {
  return (
    <section
      id="experience"
      className="relative px-6 md:px-12 py-24 md:py-32 z-10"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 font-mono text-xs text-[var(--muted)] mb-14 reveal">
          <span className="section-num">05 / PATH</span>
          <span className="w-10 h-px bg-[var(--border)]" />
          <span>EDUCATION &amp; JOURNEY</span>
        </div>

        <h2 className="text-4xl md:text-7xl font-bold mb-16 reveal leading-[0.9]">
          Four semesters in,
          <br />
          <span className="font-serif italic text-[var(--muted)]">
            building the future.
          </span>
        </h2>

        <div className="relative max-w-3xl mx-auto">
          <div className="absolute left-3 md:left-4 top-2 bottom-2 w-px bg-gradient-to-b from-[var(--accent)] via-[var(--border)] to-transparent" />

          <div className="space-y-14">
            {timeline.map((item, i) => (
              <div key={i} className="relative pl-12 md:pl-16 reveal">
                <div
                  className={`absolute left-3 md:left-4 top-1.5 -translate-x-1/2 ${item.dotSize} rounded-full ${item.dotColor} ring-4 ring-[var(--bg)]`}
                />
                <div
                  className={`font-mono text-xs ${item.dateColor} mb-2 tracking-wider`}
                >
                  {item.date}
                </div>
                <h3
                  className={`${
                    item.chips ? "text-2xl md:text-3xl" : "text-xl md:text-2xl"
                  } font-bold mb-1`}
                >
                  {item.title}
                </h3>
                <div
                  className={`${item.orgColor} font-mono text-sm mb-3 tracking-wider`}
                >
                  {item.org}
                </div>
                <p className="text-[var(--muted)] leading-relaxed max-w-2xl mb-3">
                  {item.desc}
                </p>
                {item.chips && (
                  <div className="flex flex-wrap gap-2">
                    {item.chips.map((chip) => (
                      <span key={chip} className="chip">
                        {chip}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
