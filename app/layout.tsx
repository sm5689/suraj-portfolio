import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ThemeProvider } from "@/components/ThemeProvider";
import { education, profile, site } from "@/app/content";
import "./globals.css";

const geistSans = Geist({ subsets: ["latin"], variable: "--font-geist-sans", display: "swap" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono", display: "swap" });

const title = `${profile.name} | ${profile.role}`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: title, template: `%s | ${profile.name}` },
  description: profile.description,
  applicationName: profile.name,
  authors: [{ name: profile.name, url: site.url }],
  creator: profile.name,
  keywords: [
    profile.name,
    "Software Engineer",
    "Full-Stack Developer",
    "AI Engineer",
    "RAG",
    "LLM",
    "React",
    "Next.js",
    "Node.js",
    "Python",
    "Boston",
    "Northeastern University",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    url: "/",
    siteName: profile.name,
    title,
    description: profile.description,
    locale: "en_US",
    firstName: profile.firstName,
    lastName: profile.name.split(" ").slice(1).join(" "),
  },
  twitter: { card: "summary_large_image", title, description: profile.description },
  formatDetection: { telephone: false, email: false, address: false },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fbfbfa" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0b" },
  ],
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  url: site.url,
  image: `${site.url}/me-square.jpg`,
  jobTitle: profile.role,
  email: `mailto:${profile.email}`,
  address: { "@type": "PostalAddress", addressLocality: "Boston", addressRegion: "MA", addressCountry: "US" },
  alumniOf: education.map((e) => ({ "@type": "CollegeOrUniversity", name: e.school })),
  sameAs: [profile.links.github, profile.links.linkedin],
  knowsAbout: ["Software Engineering", "Retrieval-Augmented Generation", "Large Language Models", "Full-Stack Development", "Distributed Systems"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <a
          href="#main"
          className="fixed top-3 left-3 z-50 -translate-y-20 rounded-full bg-fg px-4 py-2 text-sm font-medium text-bg transition-transform focus:translate-y-0"
        >
          Skip to content
        </a>
        <ThemeProvider>{children}</ThemeProvider>
        <script
          type="application/ld+json"
          // Escape "<" so the JSON can never close the script tag early.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c") }}
        />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
