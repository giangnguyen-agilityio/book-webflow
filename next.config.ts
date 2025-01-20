import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/store',
        permanent: true,
      },
    ];
  },
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.ibb.co',
      },
      {
        protocol: 'https',
        hostname: 'avataaars.io',
        pathname: '/**',
      },
    ],
  },
  productionBrowserSourceMaps: true,
  experimental: {
    staleTimes: {
      dynamic: 15,
    },
  },
};

export default nextConfig;
