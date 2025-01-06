import { Metadata } from 'next';

// Actions
import { authenticateUser } from '@/actions';

// UI
import { SignInForm } from '@/components';

export const metadata: Metadata = {
  title: 'Sign In',
  description:
    'Sign in to your Book WebFlow account to access your profile and start shopping.',
  openGraph: {
    title: 'Sign In | Book WebFlow',
    description:
      'Sign in to your Book WebFlow account to access your profile and start shopping.',
  },
};

const SignInPage = () => <SignInForm onSubmit={authenticateUser} />;

export default SignInPage;
