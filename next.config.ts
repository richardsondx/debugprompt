import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['github.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.github.com',
      },
      {
        protocol: 'https',
        hostname: 'assets.skool.com'
      },
      {
        protocol: 'https',
        hostname: 'ideas.richdackam.com'
      }
    ]
  },
};

export default nextConfig;
