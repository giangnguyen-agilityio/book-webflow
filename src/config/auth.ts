import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

// APIs
import { validateUserCredentials } from '@/apis';

// Schemas
import { SignInSchema } from '@/schemas';

// Configs
import { authConfig } from '.';

const CredentialsProvider = Credentials({
  authorize: async (credentials) => {
    const parsedCredentials = SignInSchema.safeParse(credentials);

    if (!parsedCredentials.success) {
      return null;
    }

    const { username, password } = parsedCredentials.data;
    const validationResult = await validateUserCredentials({
      username,
      password,
    });

    return validationResult.user || null;
  },
});

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  secret: process.env.AUTH_SECRET,
  providers: [CredentialsProvider],
});
