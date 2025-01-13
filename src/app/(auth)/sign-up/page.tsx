import { Metadata } from 'next';

// Actions
import { handleRegisterUser } from '@/actions';

// Components
import { SignUpForm } from '@/components';

export const metadata: Metadata = {
  title: 'Sign Up',
  description: 'Create your Book WebFlow account to start shopping.',
  openGraph: {
    title: 'Sign Up | Book WebFlow',
    description: 'Create your Book WebFlow account to start shopping.',
  },
};

const SignUpPage = () => <SignUpForm onSubmit={handleRegisterUser} />;

export default SignUpPage;
