'use client';

import { createContext, use, useState, useCallback, ReactNode } from 'react';

export enum ToastType {
  SUCCESS = 'success',
  ERROR = 'error',
  INFO = 'info',
  WARNING = 'warning',
}

export interface IToast {
  id: number;
  message: string;
  type: ToastType;
  duration?: number;
}

interface ToastContextType {
  toasts: IToast[];
  addToast: (message: string, type: ToastType, duration?: number) => void;
  removeToast: (id: number) => void;
  removeAllToasts: () => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<IToast[]>([]);

  const removeToast = useCallback((id: number) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  }, []);

  const addToast = useCallback(
    (message: string, type: ToastType, duration = 5000) => {
      const id = Date.now();
      const newToast = { id, message, type, duration };

      setToasts((prevToasts) => [...prevToasts, newToast]);

      setTimeout(() => removeToast(id), duration);
    },
    [removeToast],
  );

  const removeAllToasts = useCallback(() => {
    setToasts([]);
  }, []);

  return (
    <ToastContext.Provider
      value={{ toasts, addToast, removeToast, removeAllToasts }}
    >
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = use(ToastContext);

  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }

  return context;
};
