import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

    images: {
      domains: ["res.cloudinary.com","img.clerk.com"], 
    // },
  },
    eslint: {
    ignoreDuringBuilds: true,
  }
};

export default nextConfig;
