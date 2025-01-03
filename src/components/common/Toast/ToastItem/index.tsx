'use client';

import { useState, useEffect } from 'react';

// Utils
import { cn } from '@/utils';

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
  success: 'bg-success',
  error: 'bg-danger',
  info: 'bg-primary',
  warning: 'bg-secondary',
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
        'font-inter text-foreground p-3 rounded-lg shadow-lg',
        'transition-all duration-300 ease-in-out transform',
        toastStyles[type],
        isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0',
      )}
    >
      <div className="flex justify-between items-center gap-6">
        <Text className="font-medium" textColor="text-foreground" type="wrap">
          {message}
        </Text>

        <Button
          isIconOnly
          aria-label="Close notification"
          className={cn('min-w-8 w-fit h-8', 'text-current bg-transparent')}
          radius="full"
          variant="solid"
          onPress={handleClose}
        >
          <CloseIcon customClass="w-3 h-3" />
        </Button>
      </div>
    </div>
  );
};

export default ToastItem;
