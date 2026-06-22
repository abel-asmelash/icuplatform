import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ['pino', 'pino-pretty'],
  images: {
    qualities:[100, 75],
    remotePatterns:[
      {
        protocol:"https",
        hostname:"static.vecteezy.com",
        port:""
      },
      {
        protocol:"https",
        hostname:"lh3.googleusercontent.com",
        port:""
      }
    ]
  }
  /* config options here */
};

export default nextConfig;
