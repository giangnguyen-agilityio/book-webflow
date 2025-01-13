import type { NextAuthConfig } from 'next-auth';
import { AdapterUser } from 'next-auth/adapters';

// Constants
import { ROUTES, ROUTES_ADMIN } from '@/constants';

// Types
import { UserSession } from '@/types';

// Models
import { UserRole } from '@/models';

declare module 'next-auth' {
  interface Session {
    user: UserSession;
  }
}

export const authConfig = {
  pages: {
    signIn: ROUTES.SIGN_IN,
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isAuthPage = [ROUTES.SIGN_IN, ROUTES.SIGN_UP].includes(
        nextUrl.pathname,
      );

      // Check if current path is an admin route
      const isAdminRoute = Object.values(ROUTES_ADMIN.STORE).some((route) => {
        // Handle dynamic routes by replacing :id with actual regex pattern
        const routePattern = route.replace(':id', '[^/]+');

        return new RegExp(`^${routePattern}$`).test(nextUrl.pathname);
      });

      // Redirect if user is not admin but tries to access admin routes
      if (isAdminRoute && auth?.user?.role !== UserRole.ADMIN) {
        return Response.redirect(new URL(ROUTES.STORE, nextUrl));
      }

      if (isLoggedIn && isAuthPage) {
        return Response.redirect(new URL(ROUTES.STORE, nextUrl));
      }

      if (!isLoggedIn && !isAuthPage) {
        return Response.redirect(new URL(ROUTES.SIGN_IN, nextUrl));
      }

      return true;
    },

    jwt({ token, user }) {
      if (user) {
        token.user = user;
      }

      return token;
    },

    session({ session, token }) {
      session.user = token.user as AdapterUser & UserSession;

      return session;
    },
  },
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60 * 24, // 1 day
  },
  trustHost: true,
  providers: [],
} satisfies NextAuthConfig;
