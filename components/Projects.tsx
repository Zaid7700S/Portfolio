"use client";

import Image from "next/image";
import Link from "next/link";
import { ProjectId, projectData } from "@/data/projects";
interface ProjectsProps {
  onOpenProject: (id: ProjectId) => void;
}

// Only display-only metadata lives here (badge label/color, year shown on the
// card). All actual project content — title, desc, tags, img, links — comes
// from data/projects.ts so there's a single source of truth.
//
// "lecture-agent" (Podium AI) is the featured project below, so it's
// excluded from this grid. Everything else you want on the homepage grid
// needs an entry here — anything left out (or added to projectData later)
// simply won't show, no build error either way.
const gridMeta: Partial<
  Record<Exclude<ProjectId, "lecture-agent">, { tag: string; tagColor: string; year: string }>
> = {
  "business-plan": { tag: "AI / MULTI-AGENT", tagColor: "text-[var(--accent)]", year: "2026" },
  "rag-analyzer": { tag: "AI / RAG", tagColor: "text-[var(--accent)]", year: "2026" },
  "ecom-store": { tag: "FULL-STACK", tagColor: "text-[var(--accent-2)]", year: "2026" },
  "quiz-app": { tag: "MOBILE", tagColor: "text-[var(--accent)]", year: "2025" },
};

const gridEntries = Object.entries(gridMeta) as [
  Exclude<ProjectId, "lecture-agent">,
  { tag: string; tagColor: string; year: string }
][];

const gridProjects = gridEntries.map(([id, meta]) => ({
  id,
  ...meta,
  ...projectData[id],
}));

export default function Projects({ onOpenProject }: ProjectsProps) {
  function handleTriggerClick(
    e: React.MouseEvent<HTMLDivElement>,
    id: ProjectId
  ) {
    if ((e.target as HTMLElement).closest("a")) return;
    e.preventDefault();
    onOpenProject(id);
  }

  return (
    <section id="work" className="relative px-6 md:px-12 py-24 md:py-32 z-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-14 reveal flex-wrap gap-4">
          <div className="flex items-center gap-3 font-mono text-xs text-[var(--muted)]">
            <span className="section-num">04 / WORK</span>
            <span className="w-10 h-px bg-[var(--border)]" />
            <span>SELECTED PROJECTS</span>
          </div>
          <a
            href="#contact"
            className="hidden md:flex items-center gap-2 text-sm ul-link"
          >
            Want to build something?{" "}
            <i className="fas fa-arrow-up-right-from-square text-[10px]" />
          </a>
        </div>

        {/* Featured project */}
        <div className="reveal mb-8">
          <div
            className="project-trigger group block cursor-pointer"
            onClick={(e) => handleTriggerClick(e, "lecture-agent")}
          >
            <div className="grid lg:grid-cols-12 gap-6 lg:gap-8 items-center border border-[var(--border)] rounded-3xl p-5 md:p-8 hover:border-[var(--accent)] hover:bg-[var(--bg-2)] transition-all duration-500">
              <div className="lg:col-span-7 space-y-4 order-2 lg:order-1">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[10px] text-[var(--accent)] tracking-widest border border-[var(--accent)] px-2 py-0.5 rounded">
                    FEATURED · AI
                  </span>
                  <span className="font-mono text-xs text-[var(--muted)]">
                    2026 — RECENT
                  </span>
                </div>
                <h3 className="text-4xl md:text-6xl font-bold group-hover:text-[var(--accent)] transition-colors leading-none">
                  Podium
                  <br />
                  <span className="font-serif italic">AI</span>
                </h3>
                <p className="text-[var(--muted)] text-base md:text-lg leading-relaxed max-w-xl">
                  {projectData["lecture-agent"].desc}
                </p>
                <div className="flex flex-wrap gap-2 pt-1">
                  {projectData["lecture-agent"].tags.map((tag) => (
                    <span key={tag} className="chip">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex flex-wrap items-center gap-4 pt-3">
                  <span className="text-sm text-[var(--accent)] flex items-center gap-2">
                    View case study{" "}
                    <i className="fas fa-arrow-right group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="flex gap-3">
                    <a
                      href={projectData["lecture-agent"].github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-center px-4 py-2 rounded-full border border-[var(--border)] hover:border-[var(--accent)] hover:text-[var(--accent)] text-xs transition-colors flex items-center gap-2 font-mono"
                    >
                      <i className="fab fa-github" /> Code
                    </a>
                    <a
                      href={projectData["lecture-agent"].demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-center px-4 py-2 rounded-full border border-[var(--border)] hover:border-[var(--accent-2)] hover:text-[var(--accent-2)] text-xs transition-colors flex items-center gap-2 font-mono"
                    >
                      <i className="fas fa-external-link-alt" /> Live Demo
                    </a>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-5 order-1 lg:order-2 relative aspect-[4/3] rounded-2xl overflow-hidden bg-[var(--bg-2)]">
                <Image
                  src={projectData["lecture-agent"].img}
                  alt={projectData["lecture-agent"].title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-contain group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)]/50 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                  <div className="font-mono text-[10px] text-[var(--fg)]/80 tracking-widest">
                    AGENT STATUS
                  </div>
                  <div className="flex items-center gap-1.5 font-mono text-[10px] text-[var(--accent)]">
                    <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
                    HITL REVIEW ACTIVE
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Project grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {gridProjects.map((p) => (
            <div
              key={p.id}
              className="project-trigger tilt-card project-card group block border border-[var(--border)] rounded-3xl overflow-hidden cursor-pointer flex flex-col h-full"
              onClick={(e) => handleTriggerClick(e, p.id)}
            >
              <div className="aspect-[16/10] overflow-hidden relative bg-[var(--bg-2)]">
                <Image
                  src={p.img}
                  alt={p.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-contain group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)]/60 to-transparent" />
                <div
                  className={`absolute top-4 right-4 font-mono text-[10px] ${p.tagColor} bg-[var(--bg)]/80 backdrop-blur px-2 py-1 rounded`}
                >
                  {p.tag}
                </div>
              </div>
              <div className="p-6 md:p-7 tilt-layer-1 flex flex-col flex-grow">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-xs text-[var(--accent)]">
                    {p.year}
                  </span>
                  <span className="text-xs text-[var(--muted)] group-hover:text-[var(--accent)] transition-colors flex items-center gap-1">
                    Details{" "}
                    <i className="fas fa-arrow-up-right-from-square text-[10px]" />
                  </span>
                </div>
                <h3 className="text-2xl font-bold mb-2">{p.title}</h3>
                <p className="text-[var(--muted)] mb-4 text-sm leading-relaxed">
                  {p.desc}
                </p>
                <div className="flex flex-wrap gap-2 mb-5">
                  {p.tags.map((tag) => (
                    <span key={tag} className="chip">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="mt-auto pt-4 border-t border-[var(--border)] flex gap-3">
                  <a
                    href={p.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`View ${p.title} source code on GitHub`}
                    className="flex-1 text-center py-2.5 rounded-full border border-[var(--border)] hover:border-[var(--accent)] hover:text-[var(--accent)] text-sm transition-colors flex items-center justify-center gap-2"
                  >
                    <i className="fab fa-github" /> Code
                  </a>
                  <a
                    href={p.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`View ${p.title} live demo`}
                    className="flex-1 text-center py-2.5 rounded-full border border-[var(--border)] hover:border-[var(--accent-2)] hover:text-[var(--accent-2)] text-sm transition-colors flex items-center justify-center gap-2"
                  >
                    <i className="fas fa-external-link-alt" /> Live Demo
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-14 flex justify-center reveal">
          <Link
            href="/projects"
            className="magnetic group inline-flex items-center gap-3 px-8 py-4 border border-[var(--border-hi)] hover:border-[var(--accent)] hover:text-[var(--accent)] rounded-full font-semibold transition-colors"
          >
            <span>View all projects</span>
            <i className="fas fa-arrow-right group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}