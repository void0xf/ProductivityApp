import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // If you're migrating from CRA, this redirects build output to 'build' folder
  // You can change this to 'out' or '.next' based on your preference
  distDir: "build",
  // Enable React strict mode for better development experience
  reactStrictMode: true,
};

export default nextConfig;
