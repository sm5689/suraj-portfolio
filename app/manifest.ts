import type { MetadataRoute } from "next";
import { profile } from "@/app/content";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${profile.name} | ${profile.role}`,
    short_name: profile.name,
    description: profile.description,
    start_url: "/",
    display: "browser",
    background_color: "#fbfbfa",
    theme_color: "#0d0d0f",
    icons: [{ src: "/apple-icon", sizes: "180x180", type: "image/png" }],
  };
}
