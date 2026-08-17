import type { MetadataRoute } from "next";
import { projectData } from "@/data/projects";

const siteUrl = "https://zaidarshad.me";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const projectPages = Object.keys(projectData).map((slug) => ({
    url: `${siteUrl}/projects/${slug}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    {
      url: siteUrl,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${siteUrl}/projects`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...projectPages,
  ];
}