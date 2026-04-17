import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  // Allow mobile device on local network for HMR
  allowedDevOrigins: ["192.168.1.130", "localhost:3000"],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ymikltcckptzjnlgwuvc.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
};

export default nextConfig;
