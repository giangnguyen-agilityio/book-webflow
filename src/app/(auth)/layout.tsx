import { ReactNode } from 'react';

// Utils
import { cn } from '@/utils';

// Components
import { Heading } from '@/components';

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => (
  <main className="min-h-screen p-4 pt-16">
    <Heading
      aria-label="Logo"
      as="h1"
      className="text-5xl tracking-widest text-center mb-6"
      textColor="text-foreground-100"
    >
      Book WebFlow
    </Heading>

    <div
      className={cn(
        'w-full max-w-md mx-auto p-7',
        'shadow-small border border-default-100',
        'rounded-large bg-background-default',
      )}
    >
      {children}
    </div>
  </main>
);

export default AuthLayout;
