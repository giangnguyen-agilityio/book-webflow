// Actions
import { authenticateUser } from '@/actions';

// UI
import { SignInForm } from '@/components';

const SignInPage = () => <SignInForm onSubmit={authenticateUser} />;

export default SignInPage;
