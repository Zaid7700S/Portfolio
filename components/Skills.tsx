import SkillBar from "./SkillBar";

const devSkills = [
  { name: "React / Node.js", level: "ADVANCED", width: 88 },
  { name: ".NET Core", level: "PROFICIENT", width: 80 },
  { name: "Python", level: "ADVANCED", width: 85 },
  { name: "Flutter / Dart", level: "PROFICIENT", width: 75 },
  { name: "SQL / NoSQL", level: "ADVANCED", width: 82 },
];

const aiSkills = [
  { name: "LangChain", level: "ADVANCED", width: 87 },
  { name: "LangGraph", level: "PROFICIENT", width: 78 },
  { name: "Agentic AI Systems", level: "INTERMEDIATE", width: 72 },
  { name: "RAG Architectures", level: "PROFICIENT", width: 80 },
  { name: "Prompt Engineering", level: "ADVANCED", width: 84 },
];

export default function Skills() {
  return (
    <section id="skills" className="relative px-6 md:px-12 py-24 md:py-32 z-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 font-mono text-xs text-[var(--muted)] mb-14 reveal">
          <span className="section-num">03 / STACK</span>
          <span className="w-10 h-px bg-[var(--border)]" />
          <span>TOOLS OF THE TRADE</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          <div className="space-y-8 reveal">
            <h2 className="text-3xl md:text-5xl font-bold leading-tight">
              Development
              <br />
              <span className="font-serif italic text-[var(--muted)]">
                & frameworks
              </span>
            </h2>
            <div className="space-y-5">
              {devSkills.map((skill) => (
                <SkillBar key={skill.name} {...skill} />
              ))}
            </div>
          </div>

          <div className="space-y-8 reveal reveal-d1">
            <h2 className="text-3xl md:text-5xl font-bold leading-tight">
              AI & Data
              <br />
              <span className="font-serif italic text-[var(--muted)]">
                & orchestration
              </span>
            </h2>
            <div className="space-y-5">
              {aiSkills.map((skill) => (
                <SkillBar key={skill.name} {...skill} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
