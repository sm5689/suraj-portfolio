import type { Metadata } from "next";
import "./globals.css";
import { profile } from "./content";

export const metadata: Metadata = {
  title: "Suraj Mishra | Software Engineer",
  description:
    "Software Engineer with experience in full-stack systems, algorithms, and scalable production applications.",
  metadataBase: new URL("https://suraj-world.vercel.app"),
  openGraph: {
    title: "Suraj Mishra | Software Engineer",
    description:
      "Software Engineer with experience in full-stack systems, algorithms, and scalable production applications.",
    url: "https://suraj-world.vercel.app",
    siteName: "Suraj Mishra | Software Engineer",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Suraj Mishra | Software Engineer",
    description:
      "Software Engineer with experience in full-stack systems, algorithms, and scalable production applications.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}