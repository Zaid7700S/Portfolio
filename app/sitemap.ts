import type { MetadataRoute } from "next";
// TODO: keep this in sync with the siteUrl in app/layout.tsx
const siteUrl = "https://zaidarshad.me";
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
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
  ];
}
