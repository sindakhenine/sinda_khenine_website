import type { NextConfig } from "next";
const config: NextConfig = { images: { formats: ["image/avif", "image/webp"] }, turbopack: { root: process.cwd() } };
export default config;
