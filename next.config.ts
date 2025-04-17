import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // images: {
    // remotePatterns: [
    //   {
    //     protocol: 'https',
    //     hostname: 'randomuser.me',
    //     pathname: '/api/portraits/**',
    //   },
    // ],
    images: {
      domains: ["res.cloudinary.com"], // ✅ Add Cloudinary here
    // },
  },
};

export default nextConfig;
