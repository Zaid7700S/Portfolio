"use client";

import { useState } from "react";
import { ProjectId } from "@/data/projects";

import ParticleCanvas from "./ParticleCanvas";
import ScrollProgress from "./ScrollProgress";
import Navbar from "./Navbar";
import Hero from "./Hero";
import About from "./About";
import Marquee from "./Marquee";
import Skills from "./Skills";
import Projects from "./Projects";
import Manifesto from "./Manifesto";
import Experience from "./Experience";
import Contact from "./Contact";
import Footer from "./Footer";
import ProjectModal from "./ProjectModal";
import GlobalEffects from "./GlobalEffects";

export default function Portfolio() {
  const [selectedProject, setSelectedProject] = useState<ProjectId | null>(
    null
  );

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
      <Hero />
      <About />
      <Marquee />
      <Skills />
      <Projects onOpenProject={setSelectedProject} />
      <Manifesto />
      <Experience />
      <Contact />
    </main>

      <Footer />
      <GlobalEffects />
    </>
  );
}
