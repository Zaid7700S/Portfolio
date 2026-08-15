import type { MetadataRoute } from "next";

// TODO: keep this in sync with the siteUrl in app/layout.tsx
const siteUrl = "https://your-domain.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}