import type { NextAuthConfig } from 'next-auth';
import { AdapterUser } from 'next-auth/adapters';

// Constants
import { ROUTES } from '@/constants';

// Types
import { UserSession } from '@/types';

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
      const isSignInPage = nextUrl.pathname === ROUTES.SIGN_IN;

      if (isLoggedIn && isSignInPage) {
        return Response.redirect(new URL(ROUTES.STORE, nextUrl));
      }

      if (!isLoggedIn && !isSignInPage) {
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
