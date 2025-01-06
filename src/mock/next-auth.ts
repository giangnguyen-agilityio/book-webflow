const NextAuth = () => ({
  Credentials: jest.fn(),
  signIn: jest.fn(),
  signOut: jest.fn(),
  auth: jest.fn(),
  handlers: {
    GET: jest.fn(),
    POST: jest.fn(),
  },
});

export default NextAuth;
