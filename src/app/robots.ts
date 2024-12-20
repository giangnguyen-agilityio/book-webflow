import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      disallow: '',
    },
    sitemap: 'https://book-webflow-gn.vercel.app/sitemap.xml',
  };
}
