import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: [
      'secure.gravatar.com',
      'dev-brew-cache.pantheonsite.io',
    ]
  }
};

export default nextConfig;
