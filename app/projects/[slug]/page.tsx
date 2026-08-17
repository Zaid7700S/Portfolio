import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ProjectId, projectData } from "@/data/projects";
import ParticleCanvas from "@/components/ParticleCanvas";
import ScrollProgress from "@/components/ScrollProgress";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GlobalEffects from "@/components/GlobalEffects";
import ChatTerminal from "@/components/ChatTerminal";

const siteUrl = "https://zaidarshad.me";

export function generateStaticParams() {
  return Object.keys(projectData).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projectData[slug as ProjectId];
  if (!project) return {};

  return {
    title: project.title,
    description: project.desc,
    openGraph: {
      title: `${project.title} — Zaid Arshad`,
      description: project.desc,
      url: `${siteUrl}/projects/${slug}`,
      images: [{ url: project.img, width: 1200, height: 630, alt: project.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} — Zaid Arshad`,
      description: project.desc,
      images: [project.img],
    },
  };
}

export default async function ProjectCaseStudy({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const id = slug as ProjectId;
  const project = projectData[id];

  if (!project) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.desc,
    creator: { "@type": "Person", name: "Zaid Arshad" },
    url: `${siteUrl}/projects/${id}`,
    image: `${siteUrl}${project.img}`,
    keywords: project.tags.join(", "),
  };

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="noise" />
      <ParticleCanvas />
      <ScrollProgress />
      <Navbar />

      <main>
        <article className="relative px-6 md:px-12 pt-36 pb-24 md:pb-32 z-10">
          <div className="max-w-4xl mx-auto">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-sm text-[var(--muted)] hover:text-[var(--accent)] transition-colors mb-10"
            >
              <i className="fas fa-arrow-left text-xs" />
              All projects
            </Link>

            <div className="flex items-center gap-3 font-mono text-xs text-[var(--muted)] mb-6">
              <span className="section-num">{project.subtitle.toUpperCase()}</span>
              {project.year && (
                <>
                  <span className="w-10 h-px bg-[var(--border)]" />
                  <span>{project.year}</span>
                </>
              )}
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-[0.95]">
              {project.title}
            </h1>

            <div className="flex flex-wrap gap-2 mb-10">
              {project.tags.map((tag) => (
                <span key={tag} className="chip">
                  {tag}
                </span>
              ))}
            </div>

            <div className="aspect-video rounded-2xl overflow-hidden mb-12 border border-[var(--border)] relative bg-[var(--bg-2)]">
              <Image src={project.img} alt={project.title} fill className="object-contain" />
            </div>

            <p className="text-[var(--muted)] text-lg leading-relaxed mb-12">
              {project.desc}
            </p>

            {project.problem && (
              <section className="mb-12">
                <h2 className="text-2xl font-bold mb-4">The Problem</h2>
                <p className="text-[var(--muted)] leading-relaxed">{project.problem}</p>
              </section>
            )}

            {project.approach && project.approach.length > 0 && (
              <section className="mb-12">
                <h2 className="text-2xl font-bold mb-4">Approach</h2>
                <div className="space-y-4">
                  {project.approach.map((para, i) => (
                    <p key={i} className="text-[var(--muted)] leading-relaxed">
                      {para}
                    </p>
                  ))}
                </div>
              </section>
            )}

            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4">Key Features</h2>
              <ul className="space-y-3">
                {project.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-[var(--fg)]">
                    <i className="fas fa-check-circle text-[var(--accent)] mt-1.5 text-sm" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </section>

            {project.challenges && (
              <section className="mb-12">
                <h2 className="text-2xl font-bold mb-4">Challenges</h2>
                <p className="text-[var(--muted)] leading-relaxed">{project.challenges}</p>
              </section>
            )}

            {project.outcome && (
              <section className="mb-12">
                <h2 className="text-2xl font-bold mb-4">Outcome</h2>
                <p className="text-[var(--muted)] leading-relaxed">{project.outcome}</p>
              </section>
            )}

            {project.gallery && project.gallery.length > 0 && (
              <section className="mb-12">
                <h2 className="text-2xl font-bold mb-4">Gallery</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {project.gallery.map((src) => (
                    <div
                      key={src}
                      className="aspect-video rounded-xl overflow-hidden border border-[var(--border)] relative bg-[var(--bg-2)]"
                    >
                      <Image src={src} alt={project.title} fill className="object-contain" />
                    </div>
                  ))}
                </div>
              </section>
            )}

            <div className="flex flex-col sm:flex-row gap-4 mt-12 pt-8 border-t border-[var(--border)]">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-3 px-6 py-4 border border-[var(--border-hi)] hover:border-[var(--accent)] hover:bg-[var(--bg-3)] rounded-full transition-colors"
              >
                <i className="fab fa-github text-lg" /> View Repository
              </a>
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-3 px-6 py-4 bg-[var(--accent)] text-[var(--bg)] hover:bg-[var(--fg)] rounded-full transition-colors font-semibold"
              >
                <i className="fas fa-external-link-alt" /> Live Demo
              </a>
            </div>
          </div>
        </article>
      </main>

      <Footer />
      <GlobalEffects />
      <ChatTerminal />
    </>
  );
}