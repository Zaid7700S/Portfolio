const items = [
  { text: "Python", serif: false },
  { text: "LangChain", serif: true },
  { text: "React", serif: false },
  { text: ".NET Core", serif: true },
  { text: "Node.js", serif: false },
  { text: "LangGraph", serif: true },
  { text: "Agentic AI", serif: false },
  { text: "SQL / NoSQL", serif: true },
  { text: "Flutter", serif: false },
];

function MarqueeGroup({ ariaHidden = false }: { ariaHidden?: boolean }) {
  return (
    <div
      className="flex items-center gap-12 px-6 shrink-0"
      aria-hidden={ariaHidden || undefined}
    >
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-12">
          <span
            className={`text-2xl md:text-3xl font-bold ${
              item.serif ? "font-serif italic" : ""
            }`}
          >
            {item.text}
          </span>
          <span className="text-[var(--accent)] text-xl">✦</span>
        </span>
      ))}
    </div>
  );
}

export default function Marquee() {
  return (
    <section className="relative py-7 z-10 border-y border-[var(--border)] overflow-hidden bg-[var(--bg-2)]">
      <div className="flex marquee-track whitespace-nowrap">
        <MarqueeGroup />
        <MarqueeGroup ariaHidden />
      </div>
    </section>
  );
}
