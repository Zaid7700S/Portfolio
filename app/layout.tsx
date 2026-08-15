import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono, Instrument_Serif } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./globals.css";


const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
  display: "swap",
});

const siteUrl = "https://your-domain.com"; // TODO: replace with real deployed URL
const siteTitle = "Zaid Arshad — Software Engineer & AI Developer";
const siteDescription =
  "Software Engineering student at Superior University building Agentic AI systems, RAG pipelines, and full-stack applications.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: "%s — Zaid Arshad",
  },
  description: siteDescription,
  keywords: [
    "Zaid Arshad",
    "Software Engineer",
    "Agentic AI",
    "LangGraph",
    "LangChain",
    "RAG",
    "Full-Stack Developer",
    "Lahore",
  ],
  authors: [{ name: "Zaid Arshad" }],
  creator: "Zaid Arshad",
  openGraph: {
    type: "website",
    url: siteUrl,
    title: siteTitle,
    description: siteDescription,
    siteName: "Zaid Arshad",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Zaid Arshad — Software Engineer & AI Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

// JSON-LD structured data — helps search engines understand who this site
// belongs to and connects it to your other profiles (rich results / knowledge panel).
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Zaid Arshad",
  alternateName: "Muhammad Zaid",
  jobTitle: "Software Engineering Student & Agentic AI Developer",
  url: siteUrl,
  image: `${siteUrl}/og-image.png`,
  email: "mailto:zaid3055540@gmail.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Lahore",
    addressCountry: "PK",
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Superior University",
    address: "Lahore, Pakistan",
  },
  knowsAbout: [
    "Agentic AI",
    "LangGraph",
    "LangChain",
    "Retrieval-Augmented Generation",
    "Full-Stack Development",
    "React",
    ".NET",
  ],
  sameAs: [
    "https://github.com/Zaid7700S",
    "https://www.linkedin.com/in/zaid-arshad-8337423bb/",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body
        className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} ${instrumentSerif.variable} font-display`}
      >
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}