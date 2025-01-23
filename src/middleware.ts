import NextAuth from 'next-auth';

// Config
import { authConfig } from '@/config';

export default NextAuth(authConfig).auth;

export const config = {
  matcher: [
    // Match all pages except static files and SEO-related files
    '/((?!api|_next|_static|_vercel|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};
