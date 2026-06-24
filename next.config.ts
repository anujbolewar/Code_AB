import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Move serverComponentsExternalPackages to the root level as per Next.js 15
  serverExternalPackages: ['@prisma/client'],
  webpack: (config, { isServer }) => {
    if (isServer) {
      // Exclude Prisma from server-side bundling to avoid WASM issues
      config.externals.push('@prisma/client');
    }
    return config;
  },
};

export default nextConfig;
