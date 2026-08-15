"use client";

import { useEffect } from "react";
import Image from "next/image";
import { ProjectId, projectData } from "@/data/projects";

interface ProjectModalProps {
  projectId: ProjectId | null;
  onClose: () => void;
}

export default function ProjectModal({ projectId, onClose }: ProjectModalProps) {
  const isActive = projectId !== null;
  const data = projectId ? projectData[projectId] : null;

  useEffect(() => {
    document.body.style.overflow = isActive ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isActive]);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  return (
    <div
      id="projectModal"
      className={`modal-overlay ${isActive ? "active" : ""}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="modal-content p-6 md:p-10">
        <button
          id="closeModal"
          className="modal-close"
          aria-label="Close"
          onClick={onClose}
        >
          <i className="fas fa-times" />
        </button>
        <div id="modalBody">
          {data && (
            <>
              <div className="flex flex-wrap gap-2 mb-4">
                {data.tags.map((t) => (
                  <span key={t} className="chip">
                    {t}
                  </span>
                ))}
              </div>
              <h3 className="text-3xl md:text-4xl font-bold mb-2">
                {data.title}
              </h3>
              <p className="text-[var(--accent-2)] font-mono text-sm mb-6 tracking-wider">
                {data.subtitle}
              </p>
              <div className="aspect-video rounded-xl overflow-hidden mb-8 border border-[var(--border)] relative bg-[var(--bg-2)]">
                <Image
                  src={data.img}
                  alt={data.title}
                  fill
                  className="object-contain"
                />
              </div>
              <p className="text-[var(--muted)] text-lg leading-relaxed mb-8">
                {data.desc}
              </p>
              <div>
                <h4 className="font-mono text-xs text-[var(--accent)] tracking-widest mb-4">
                  KEY FEATURES
                </h4>
                <ul className="space-y-3 mb-8">
                  {data.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-3 text-[var(--fg)]"
                    >
                      <i className="fas fa-check-circle text-[var(--accent)] mt-1.5 text-sm" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <a
                  href={data.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-3 px-6 py-4 border border-[var(--border-hi)] hover:border-[var(--accent)] hover:bg-[var(--bg-3)] rounded-full transition-colors"
                >
                  <i className="fab fa-github text-lg" /> View Repository
                </a>
                <a
                  href={data.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-3 px-6 py-4 bg-[var(--accent)] text-[var(--bg)] hover:bg-[var(--fg)] rounded-full transition-colors font-semibold"
                >
                  <i className="fas fa-external-link-alt" /> Live Demo
                </a>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
