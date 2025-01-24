import { Session } from 'next-auth';
import { NextRequest } from 'next/server';

// Constants
import { ROUTES, ROUTES_ADMIN } from '@/constants';

// Models
import { User, UserRole } from '@/models';

// Mock
import { MOCK_USER } from '@/mock';

import { authConfig } from '../auth.config';

describe('authConfig', () => {
  beforeAll(() => {
    // Mock Response.redirect
    global.Response.redirect = jest.fn().mockImplementation((url) => {
      return new Response(null, {
        status: 307,
        headers: { Location: url.toString() },
      });
    });
  });

  describe('authorized callback', () => {
    const baseURL = 'http://localhost:3000';
    const mockURL = new URL(baseURL);

    // Helper function to create auth object
    const createAuth = (role?: UserRole) =>
      ({
        user: role ? MOCK_USER : undefined,
        expires: new Date(Date.now() + 3600).toISOString(),
      }) as Session;

    const createRequest = (path: string) =>
      ({
        nextUrl: new URL(path, mockURL),
        cookies: {},
        url: path,
      }) as NextRequest;

    describe('Admin route access', () => {
      it('should redirect non-admin users from admin routes to store page', () => {
        const auth = createAuth(UserRole.USER);
        const request = createRequest(ROUTES_ADMIN.STORE.ADD);

        const result = authConfig.callbacks.authorized({ auth, request });

        expect(result).toBeInstanceOf(Response);
        expect((result as Response).status).toBe(307);
        expect((result as Response).headers.get('Location')).toBe(
          `${baseURL}${ROUTES.STORE}`,
        );
      });

      it('should allow admin users to access admin routes', () => {
        const auth = createAuth(UserRole.ADMIN);
        const request = createRequest(ROUTES_ADMIN.STORE.ADD);

        const result = authConfig.callbacks.authorized({ auth, request });

        expect(result).toBeInstanceOf(Response);
        expect((result as Response).headers.get('Location')).toBe(
          `${baseURL}${ROUTES.STORE}`,
        );
      });
    });

    describe('Auth pages access', () => {
      it('should redirect logged in users from auth pages to store', () => {
        const auth = createAuth(UserRole.USER);
        const request = createRequest(ROUTES.SIGN_IN);

        const result = authConfig.callbacks.authorized({ auth, request });

        expect(result).toBeInstanceOf(Response);
        expect((result as Response).status).toBe(307);
        expect((result as Response).headers.get('Location')).toBe(
          `${baseURL}${ROUTES.STORE}`,
        );
      });

      it('should allow non-logged users to access auth pages', () => {
        const auth = createAuth();
        const request = createRequest(ROUTES.SIGN_IN);

        const result = authConfig.callbacks.authorized({ auth, request });

        expect(result).toBe(true);
      });
    });

    describe('Protected routes access', () => {
      it('should redirect non-logged users from protected routes to sign in', () => {
        const auth = createAuth();
        const request = createRequest(ROUTES.STORE);

        const result = authConfig.callbacks.authorized({ auth, request });

        expect(result).toBeInstanceOf(Response);
        expect((result as Response).status).toBe(307);
        expect((result as Response).headers.get('Location')).toBe(
          `${baseURL}${ROUTES.SIGN_IN}`,
        );
      });

      it('should allow logged in users to access protected routes', () => {
        const auth = createAuth(UserRole.USER);
        const request = createRequest(ROUTES.STORE);

        const result = authConfig.callbacks.authorized({ auth, request });
        expect(result).toBe(true);
      });
    });
  });

  describe('jwt callback', () => {
    it('should add user to token when user is provided', () => {
      const user = { id: '1', role: UserRole.USER };
      const token = {};

      const result = authConfig.callbacks.jwt({
        token,
        user,
        account: null,
        trigger: 'signIn',
      });

      expect(result).toEqual({ user });
    });

    it('should return unchanged token when no user is provided', () => {
      const token = { someData: 'test' };

      const result = authConfig.callbacks.jwt({
        token,
        user: undefined as unknown as User,
        account: null,
        trigger: 'signIn',
      });

      expect(result).toEqual(token);
    });
  });
});
