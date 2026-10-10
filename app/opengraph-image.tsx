import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { profile, site } from "@/app/content";

export const alt = `${profile.name}, ${profile.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const photo = `data:image/jpeg;base64,${await readFile(join(process.cwd(), "public/me-square.jpg"), "base64")}`;

const tagline = "RAG · LLM pipelines · Full-stack · Real-time data";
const domain = site.url.replace("https://", "");

/** Fetches a Geist subset from Google Fonts. Returns null offline, so the build never fails on it. */
async function loadGeist(weight: 400 | 600, text: string): Promise<ArrayBuffer | null> {
  try {
    const css = await fetch(
      `https://fonts.googleapis.com/css2?family=Geist:wght@${weight}&text=${encodeURIComponent(text)}`
    ).then((r) => r.text());
    const url = css.match(/src: url\((.+?)\) format\('(?:opentype|truetype)'\)/)?.[1];
    return url ? await fetch(url).then((r) => r.arrayBuffer()) : null;
  } catch {
    return null;
  }
}

export default async function OpenGraphImage() {
  const allText = [profile.name, profile.headline, profile.headlineTrail, profile.availability, profile.location, tagline, domain, " ·"].join("");
  const [regular, semiBold] = await Promise.all([loadGeist(400, allText), loadGeist(600, allText)]);
  const fonts =
    regular && semiBold
      ? [
          { name: "Geist", data: regular, weight: 400 as const, style: "normal" as const },
          { name: "Geist", data: semiBold, weight: 600 as const, style: "normal" as const },
        ]
      : undefined;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#0a0a0b",
          backgroundImage:
            "linear-gradient(to right, #1a1a1d 1px, transparent 1px), linear-gradient(to bottom, #1a1a1d 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          color: "#ededef",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
          <img src={photo} width={112} height={112} alt="" style={{ borderRadius: 999, border: "2px solid #2e2e33" }} />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 44, fontWeight: 600, letterSpacing: -1 }}>{profile.name}</div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 26, color: "#a1a1aa", marginTop: 6 }}>
              <div style={{ width: 12, height: 12, borderRadius: 999, background: "#34d399" }} />
              {profile.availability} · {profile.location}
            </div>
          </div>
        </div>

        {/* Satori has no inline text flow, so words wrap as individual flex items. */}
        <div style={{ display: "flex", flexWrap: "wrap", maxWidth: 1010, fontSize: 64, fontWeight: 600, letterSpacing: -2.2, lineHeight: 1.08 }}>
          {[
            ...profile.headline.split(" ").map((word) => ({ word, muted: false })),
            ...profile.headlineTrail.split(" ").map((word) => ({ word, muted: true })),
          ].map(({ word, muted }, i) => (
            <span key={i} style={{ marginRight: 16, color: muted ? "#71717a" : "#ededef" }}>
              {word}
            </span>
          ))}
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24, color: "#a1a1aa" }}>
          <span>{tagline}</span>
          <span style={{ color: "#34d399" }}>{domain}</span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts,
    }
  );
}
