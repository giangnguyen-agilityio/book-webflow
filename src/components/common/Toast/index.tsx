'use client';

// Utils
import { cn } from '@/utils';

// Contexts
import { useToast } from '@/context';

// Components
import ToastItem from './ToastItem';

const Toast = () => {
  const { toasts, removeToast } = useToast();

  return (
    <div
      aria-atomic="true"
      aria-live="polite"
      className={cn(
        'fixed top-4 z-50 flex flex-col items-end',
        'right-4 space-y-4 sm:right-2 sm:space-y-2',
      )}
    >
      {toasts.map(({ id, message, type }) => (
        <ToastItem
          key={id}
          id={id}
          message={message}
          removeToast={removeToast}
          type={type}
        />
      ))}
    </div>
  );
};

export default Toast;
