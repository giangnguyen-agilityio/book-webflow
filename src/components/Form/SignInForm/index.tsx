'use client';

import Link from 'next/link';
import { ChangeEvent, useCallback } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Checkbox, useDisclosure } from '@heroui/react';
import { useRouter } from 'next/navigation';

// Constants
import { ROUTES } from '@/constants';

// Schemas
import { SignInSchema } from '@/schemas';

// Types
import { AuthResult, AuthCredentials } from '@/types';

// Context
import { ToastType, useToast } from '@/context';

// Icons
import { EyeFilledIcon, EyeSlashFilledIcon, LoadingIcon } from '@/icons';

// Utils
import { cn } from '@/utils';

// Components
import { Input, Button } from '@/components';

interface SignInFormProps {
  onSubmit: (formData: AuthCredentials) => Promise<AuthResult>;
}

const DEFAULT_VALUE = {
  username: '',
  password: '',
};

const SignInForm = ({ onSubmit }: SignInFormProps) => {
  const router = useRouter();
  const { addToast, removeAllToasts } = useToast();
  const { isOpen: isPasswordVisible, onOpenChange: togglePasswordVisibility } =
    useDisclosure();

  const {
    control,
    formState: { isValid, isDirty, isSubmitting, errors },
    handleSubmit,
    clearErrors,
  } = useForm<AuthCredentials>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    defaultValues: DEFAULT_VALUE,
    resolver: zodResolver(SignInSchema),
  });

  // Handle input change and clear errors
  const handleInputChange = useCallback(
    (name: keyof AuthCredentials, onChange: (value: string) => void) => {
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
  const handleSignIn = async (formData: AuthCredentials) => {
    const result = await onSubmit(formData);

    if (result.success) {
      removeAllToasts();
      router.push(ROUTES.STORE);
      return;
    }

    if (result.errorMessage) {
      addToast(result.errorMessage, ToastType.ERROR);
      return;
    }
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit(handleSignIn)}>
      <div className="space-y-10">
        {/* Username Input */}
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

        {/* Password Input */}
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

      <div className="w-full flex items-center justify-between">
        <Checkbox
          aria-label="Remember me checkbox"
          title="This feature is not available in this version yet"
          classNames={{
            label: 'cursor-pointer text-start text-black',
          }}
        >
          Remember me
        </Checkbox>

        <Link
          aria-label="Forgot password link"
          data-testid="forgot-password-link"
          href={ROUTES.FORGOT_PASSWORD}
          tabIndex={isSubmitting ? -1 : 0}
          title="This feature is not available in this version yet"
          className={cn(
            'text-end text-foreground-100 font-semibold hover:underline',
            isSubmitting && 'pointer-events-none opacity-50',
          )}
        >
          Forgot your password?
        </Link>
      </div>

      <Button
        aria-label="Sign in button"
        className="w-full font-semibold uppercase h-12"
        color="secondary"
        data-testid="sign-in-button"
        isDisabled={!isValid || !isDirty || isSubmitting}
        isLoading={isSubmitting}
        radius="sm"
        spinner={<LoadingIcon />}
        type="submit"
        variant="solid"
      >
        Sign in
      </Button>

      <p className="text-black text-center">
        Don&apos;t have an account?&nbsp;&nbsp;
        <Link
          aria-label="Register button"
          data-testid="register-button"
          href={ROUTES.SIGN_UP}
          tabIndex={isSubmitting ? -1 : 0}
          className={cn(
            'text-foreground-100 font-semibold hover:underline',
            isSubmitting && 'pointer-events-none opacity-50',
          )}
        >
          Register here
        </Link>
      </p>
    </form>
  );
};

export default SignInForm;
