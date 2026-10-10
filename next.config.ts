import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    // Project screenshots are served straight from their GitHub repos.
    remotePatterns: [
      { protocol: "https", hostname: "raw.githubusercontent.com", pathname: "/sm5689/**" },
    ],
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  // Keep previously shared résumé links working.
  async redirects() {
    return [{ source: "/resume.pdf", destination: "/Suraj_Mishra_Resume.pdf", permanent: false }];
  },
};

export default nextConfig;
