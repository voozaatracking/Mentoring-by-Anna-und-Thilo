import type { NextConfig } from "next";

const istProduktion = process.env.NODE_ENV === "production";

const sicherheitsHeader = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "DENY" },
  // HSTS nur in Production, damit lokale Entwicklung über http möglich bleibt.
  ...(istProduktion
    ? [{ key: "Strict-Transport-Security", value: "max-age=63072000" }]
    : []),
];

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  poweredByHeader: false,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async headers() {
    return [{ source: "/:path*", headers: sicherheitsHeader }];
  },
};

export default nextConfig;
