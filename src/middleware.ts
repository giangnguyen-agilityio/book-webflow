import NextAuth from 'next-auth';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Config
import { authConfig } from '@/config';

export function middleware(request: NextRequest) {
  // Generate random nonce for script and style security
  const nonce = Buffer.from(crypto.randomUUID()).toString('base64');

  /** Content Security Policy (CSP) Configuration:
    1. Strictly control which resources can be loaded on the website
    2. Image loading restrictions:
       - Allow from same origin
       - Allow blob URLs
       - Allow data URLs
    3. Disable <object> and <embed> tags to prevent XSS attacks
    4. Restrict <base> tag href attribute to same origin only
    5. Forms can only submit to same origin endpoints
    6. Prevent website from being embedded in iframes from other domains
    7. Automatically upgrade HTTP connections to HTTPS for security
  */
  const cspHeader = `
    script-src 'self' 'nonce-${nonce}' 'strict-dynamic';
    img-src 'self' blob: data:;
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    upgrade-insecure-requests;
  `;
  // Remove extra whitespace and line breaks in CSP header
  const contentSecurityPolicyHeaderValue = cspHeader
    .replace(/\s{2,}/g, ' ')
    .trim();

  // Add nonce and CSP to request headers
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-nonce', nonce);
  requestHeaders.set(
    'Content-Security-Policy',
    contentSecurityPolicyHeaderValue,
  );

  // Create response with updated headers
  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  // Add CSP to response headers
  response.headers.set(
    'Content-Security-Policy',
    contentSecurityPolicyHeaderValue,
  );

  return response;
}

export const auth = NextAuth(authConfig).auth;

export const config = {
  matcher: [
    // Match all pages except static files and SEO-related files
    '/((?!api|_next|_static|_vercel|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};
