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
        hostname: 'res.cloudinary.com',
        pathname: '/**',
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
