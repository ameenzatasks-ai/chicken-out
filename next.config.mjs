import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // A stray package-lock.json in C:\Users\ameen made Next infer that as the
  // workspace root, which breaks output file tracing. Pin it to this project.
  outputFileTracingRoot: dirname(fileURLToPath(import.meta.url)),
  images: {
    // All imagery is local under /public — no remotePatterns, which keeps the
    // Image Optimizer's remote-fetch surface closed entirely.
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 768, 1024, 1280, 1536, 1920],
    imageSizes: [64, 96, 128, 256, 384],
  },
  poweredByHeader: false,
  reactStrictMode: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
};

export default nextConfig;
