"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ProjectId, projectData } from "@/data/projects";

import ParticleCanvas from "./ParticleCanvas";
import ScrollProgress from "./ScrollProgress";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ProjectModal from "./ProjectModal";
import GlobalEffects from "./GlobalEffects";

export default function AllProjects() {
  const [selectedProject, setSelectedProject] = useState<ProjectId | null>(
    null
  );
  const projects = Object.entries(projectData) as [
    ProjectId,
    (typeof projectData)[ProjectId]
  ][];

  return (
    <>
      <div className="noise" />
      <ParticleCanvas />

      <ProjectModal
        projectId={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      <ScrollProgress />
      <Navbar />

    <main>
      <section className="relative px-6 md:px-12 pt-36 pb-24 md:pb-32 z-10">
        <div className="max-w-7xl mx-auto">
          <Link
            href="/#work"
            className="inline-flex items-center gap-2 text-sm text-[var(--muted)] hover:text-[var(--accent)] transition-colors mb-10 reveal"
          >
            <i className="fas fa-arrow-left text-xs" />
            Back to home
          </Link>

          <div className="flex items-center gap-3 font-mono text-xs text-[var(--muted)] mb-6 reveal">
            <span className="section-num">ALL WORK</span>
            <span className="w-10 h-px bg-[var(--border)]" />
            <span>{projects.length} PROJECTS</span>
          </div>

          <h1 className="text-4xl md:text-7xl font-bold mb-16 reveal leading-[0.9]">
            Everything
            <br />
            <span className="font-serif italic text-[var(--muted)]">
              I&apos;ve built.
            </span>
          </h1>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map(([id, data]) => (
              <div
                key={id}
                className="tilt-card project-card group block border border-[var(--border)] rounded-3xl overflow-hidden cursor-pointer flex flex-col h-full reveal"
                onClick={() => setSelectedProject(id)}
              >
                <div className="aspect-[16/10] overflow-hidden relative bg-[var(--bg-2)]">
                  <Image
                    src={data.img}
                    alt={data.title}
                    fill
                    className="object-contain group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)]/60 to-transparent" />
                </div>
                <div className="p-6 tilt-layer-1 flex flex-col flex-grow">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-xs text-[var(--accent-2)] tracking-wider">
                      {data.subtitle}
                    </span>
                    <span className="text-xs text-[var(--muted)] group-hover:text-[var(--accent)] transition-colors flex items-center gap-1">
                      Details{" "}
                      <i className="fas fa-arrow-up-right-from-square text-[10px]" />
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{data.title}</h3>
                  <p className="text-[var(--muted)] mb-4 text-sm leading-relaxed line-clamp-3">
                    {data.desc}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-5">
                    {data.tags.map((tag) => (
                      <span key={tag} className="chip">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="mt-auto pt-4 border-t border-[var(--border)] flex gap-3">
                    
                      <a href={data.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="flex-1 text-center py-2.5 rounded-full border border-[var(--border)] hover:border-[var(--accent)] hover:text-[var(--accent)] text-sm transition-colors flex items-center justify-center gap-2"
                    >
                      <i className="fab fa-github" /> Code
                    </a>
                    
                      <a href={data.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="flex-1 text-center py-2.5 rounded-full border border-[var(--border)] hover:border-[var(--accent-2)] hover:text-[var(--accent-2)] text-sm transition-colors flex items-center justify-center gap-2"
                    >
                      <i className="fas fa-external-link-alt" /> Live Demo
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      </main>

      <Footer />
      <GlobalEffects />
    </>
  );
}