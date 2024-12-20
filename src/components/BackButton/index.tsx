'use client';

import { useRouter } from 'next/navigation';

// Utils
import { cn } from '@/utils';

// Types
import { CustomClassType } from '@/types';

// Icons
import { LeftArrowIcon } from '@/icons';

// Components
import { Button } from '@/components';

const BackButton = ({ customClass }: CustomClassType) => {
  const router = useRouter();

  const handleNavigateBack = () => {
    router.back();
  };

  return (
    <Button
      startContent={<LeftArrowIcon />}
      variant="flat"
      className={cn(
        'mb-4 p-0 min-w-fit bg-transparent',
        'font-semibold text-lg text-text-primary',
        'hover:underline underline-offset-4',
        customClass,
      )}
      onPress={handleNavigateBack}
    >
      Back
    </Button>
  );
};

export default BackButton;
