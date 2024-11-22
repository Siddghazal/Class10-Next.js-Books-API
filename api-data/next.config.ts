import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images:{
    remotePatterns:[
      {
        protocol: "https",
        hostname: "'",
        port:"",
      }
    ]
  }
  /* config options here */
};

export default nextConfig;
