'use client';

import { useState, useEffect } from 'react';
import { cn } from '@nextui-org/theme';

// Types
import { IToast } from '@/context';

// Icons
import { CloseIcon } from '@/icons';

// Components
import { Button, Text } from '@/components';

interface ToastItemProps extends IToast {
  removeToast: (id: number) => void;
}

const toastStyles = {
  success: 'bg-green-150',
  error: 'bg-red-100',
  info: 'bg-background-primary',
  warning: 'bg-yellow-500',
};

const ToastItem = ({ id, message, type, removeToast }: ToastItemProps) => {
  const [isVisible, setIsVisible] = useState(false);

  const handleClose = () => {
    setIsVisible(false);
    removeToast(id);
  };

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div
      aria-label="toast"
      role="alert"
      className={cn(
        'font-inter text-text-default p-3 rounded-lg shadow-lg',
        'transition-all duration-300 ease-in-out transform',
        toastStyles[type],
        isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0',
      )}
    >
      <div className="flex justify-between items-center gap-6">
        <Text className="font-medium" textColor="text-text-default" type="wrap">
          {message}
        </Text>

        <Button
          isIconOnly
          aria-label="Close notification"
          radius="full"
          variant="solid"
          className={cn(
            'min-w-8 w-fit h-8 text-current',
            'bg-transparent data-[hover=true]:border-white-100',
          )}
          onPress={handleClose}
        >
          <CloseIcon customClass="w-3 h-3" />
        </Button>
      </div>
    </div>
  );
};

export default ToastItem;
