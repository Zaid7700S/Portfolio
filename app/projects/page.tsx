import type { Metadata } from "next";
import AllProjects from "@/components/AllProjects";

export const metadata: Metadata = {
  title: "Projects — Zaid Arshad",
  description:
    "Full showcase of projects by Zaid Arshad — Agentic AI systems, RAG pipelines, full-stack apps, and more.",
};

export default function ProjectsPage() {
  return <AllProjects />;
}