'use client';

import Link from 'next/link';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDisclosure } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { useCallback, ChangeEvent } from 'react';
import { useForm, Controller } from 'react-hook-form';

// Constants
import { ROUTES } from '@/constants';

// Context
import { useToast } from '@/context';

// Icons
import { EyeFilledIcon, EyeSlashFilledIcon, LoadingIcon } from '@/icons';

// Schemas
import { SignUpSchema } from '@/schemas';

// Types
import { AuthResult, SignUpData } from '@/types';

// Components
import { Button, Input } from '@/components';

interface SignUpFormProps {
  onSubmit: (data: SignUpData) => Promise<AuthResult>;
}

const DEFAULT_VALUE = {
  name: '',
  email: '',
  username: '',
  password: '',
};

const SignUpForm = ({ onSubmit }: SignUpFormProps) => {
  const router = useRouter();
  const { addToast } = useToast();
  const { isOpen: isPasswordVisible, onOpenChange: togglePasswordVisibility } =
    useDisclosure();

  const {
    control,
    formState: { isValid, isDirty, isSubmitting, errors },
    handleSubmit,
    clearErrors,
  } = useForm<SignUpData>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    defaultValues: DEFAULT_VALUE,
    resolver: zodResolver(SignUpSchema),
  });

  // Handle input change and clear errors
  const handleInputChange = useCallback(
    (name: keyof SignUpData, onChange: (value: string) => void) => {
      return (e: ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value);

        // Clear error message on change
        if (errors[name]?.message) {
          clearErrors(name);
        }
      };
    },
    [errors, clearErrors],
  );

  // Handle form submission
  const handleSignUp = async (formData: SignUpData) => {
    const result = await onSubmit(formData);

    if (result.success) {
      router.push(ROUTES.STORE);
      return;
    }

    if (result.errorMessage) {
      addToast(result.errorMessage, 'error');
      return;
    }
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit(handleSignUp)}>
      <div className="space-y-10">
        <Controller
          control={control}
          name="name"
          render={({
            field: { name, onChange, ...rest },
            fieldState: { error },
          }) => (
            <Input
              {...rest}
              isRequired
              aria-label="Full name input field"
              autoComplete="off"
              data-testid="name-input"
              errorMessage={error?.message}
              isDisabled={isSubmitting}
              isInvalid={!!error?.message}
              label="Full Name"
              labelPlacement="outside"
              placeholder="Enter your full name"
              radius="sm"
              classNames={{
                label: 'text-base pb-2',
                inputWrapper: 'h-12',
                errorMessage: 'text-[14px]',
              }}
              onChange={handleInputChange(name, onChange)}
            />
          )}
        />

        <Controller
          control={control}
          name="email"
          render={({
            field: { name, onChange, ...rest },
            fieldState: { error },
          }) => (
            <Input
              {...rest}
              isRequired
              aria-label="Email input field"
              autoComplete="off"
              data-testid="email-input"
              errorMessage={error?.message}
              isDisabled={isSubmitting}
              isInvalid={!!error?.message}
              label="Email"
              labelPlacement="outside"
              placeholder="Enter your email"
              radius="sm"
              type="email"
              classNames={{
                label: 'text-base pb-2',
                inputWrapper: 'h-12',
                errorMessage: 'text-[14px]',
              }}
              onChange={handleInputChange(name, onChange)}
            />
          )}
        />

        <Controller
          control={control}
          name="username"
          render={({
            field: { name, onChange, ...rest },
            fieldState: { error },
          }) => (
            <Input
              {...rest}
              isRequired
              aria-label="Username input field"
              autoComplete="off"
              data-testid="username-input"
              errorMessage={error?.message}
              isDisabled={isSubmitting}
              isInvalid={!!error?.message}
              label="Username"
              labelPlacement="outside"
              placeholder="Enter your username"
              radius="sm"
              classNames={{
                label: 'text-base pb-2',
                inputWrapper: 'h-12',
                errorMessage: 'text-[14px]',
              }}
              onChange={handleInputChange(name, onChange)}
            />
          )}
        />

        <Controller
          control={control}
          name="password"
          render={({
            field: { name, onChange, ...rest },
            fieldState: { error },
          }) => (
            <Input
              {...rest}
              isRequired
              aria-label="Password input field"
              autoComplete="off"
              data-testid="password-input"
              errorMessage={error?.message}
              isDisabled={isSubmitting}
              isInvalid={!!error?.message}
              label="Password"
              labelPlacement="outside"
              placeholder="Enter your password"
              radius="sm"
              type={isPasswordVisible ? 'text' : 'password'}
              classNames={{
                label: 'text-base pb-2',
                inputWrapper: 'h-12',
                errorMessage: 'text-[14px]',
              }}
              endContent={
                <Button
                  isIconOnly
                  radius="sm"
                  size="md"
                  variant="light"
                  aria-label={
                    isPasswordVisible ? 'Hide password' : 'Show password'
                  }
                  onPress={togglePasswordVisibility}
                >
                  {isPasswordVisible ? (
                    <EyeSlashFilledIcon />
                  ) : (
                    <EyeFilledIcon />
                  )}
                </Button>
              }
              onChange={handleInputChange(name, onChange)}
            />
          )}
        />
      </div>

      <Button
        aria-label="Sign up button"
        className="w-full font-semibold uppercase h-12"
        color="secondary"
        data-testid="sign-up-button"
        isDisabled={!isValid || !isDirty || isSubmitting}
        isLoading={isSubmitting}
        radius="sm"
        spinner={<LoadingIcon />}
        type="submit"
        variant="solid"
      >
        Sign up
      </Button>

      <p className="text-black text-center">
        Already have an account?&nbsp;&nbsp;
        <Link
          aria-label="Sign in button"
          className="text-foreground-100 font-semibold hover:underline"
          data-testid="sign-in-button"
          href={ROUTES.SIGN_IN}
        >
          Sign in here
        </Link>
      </p>
    </form>
  );
};

export default SignUpForm;
