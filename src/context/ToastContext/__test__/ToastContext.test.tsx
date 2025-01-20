import { ReactNode } from 'react';

// Utils
import { act, renderHook, ignoredConsoleError } from '@/utils/testUtils';

// Context
import { ToastProvider, ToastType, useToast } from '..';

describe('ToastContext', () => {
  const wrapper = ({ children }: { children: ReactNode }) => (
    <ToastProvider>{children}</ToastProvider>
  );

  beforeEach(() => {
    jest.useFakeTimers();
    ignoredConsoleError();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it('should add a toast', () => {
    const { result } = renderHook(() => useToast(), { wrapper });

    act(() => {
      result.current.addToast('Test message', ToastType.SUCCESS);
    });

    expect(result.current.toasts).toHaveLength(1);
    expect(result.current.toasts[0]).toEqual(
      expect.objectContaining({
        message: 'Test message',
        type: 'success',
        duration: 5000,
      }),
    );
  });

  it('should remove a toast', () => {
    const { result } = renderHook(() => useToast(), { wrapper });

    act(() => {
      result.current.addToast('Test message', ToastType.SUCCESS);
    });

    const toastId = result.current.toasts[0].id;

    act(() => {
      result.current.removeToast(toastId);
    });

    expect(result.current.toasts).toHaveLength(0);
  });

  it('should automatically remove toast after duration', () => {
    const { result } = renderHook(() => useToast(), { wrapper });

    act(() => {
      result.current.addToast('Test message', ToastType.SUCCESS, 1000);
    });

    expect(result.current.toasts).toHaveLength(1);

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(result.current.toasts).toHaveLength(0);
  });

  it('should throw error when useToast is used outside provider', () => {
    expect(() => renderHook(() => useToast())).toThrow(
      'useToast must be used within a ToastProvider',
    );
  });

  it('should add multiple toasts', () => {
    const { result } = renderHook(() => useToast(), { wrapper });

    act(() => {
      result.current.addToast('Success message', ToastType.SUCCESS);
      result.current.addToast('Error message', ToastType.ERROR);
      result.current.addToast('Info message', ToastType.INFO);
    });

    expect(result.current.toasts).toHaveLength(3);
    expect(result.current.toasts[0].message).toBe('Success message');
    expect(result.current.toasts[1].message).toBe('Error message');
    expect(result.current.toasts[2].message).toBe('Info message');
  });

  it('should remove all toasts', () => {
    const { result } = renderHook(() => useToast(), { wrapper });

    act(() => {
      result.current.addToast('Message 1', ToastType.SUCCESS);
      result.current.addToast('Message 2', ToastType.ERROR);
      result.current.addToast('Message 3', ToastType.INFO);
    });

    expect(result.current.toasts).toHaveLength(3);

    act(() => {
      result.current.removeAllToasts();
    });

    expect(result.current.toasts).toHaveLength(0);
  });

  it('should handle removeAllToasts when there are no toasts', () => {
    const { result } = renderHook(() => useToast(), { wrapper });

    expect(result.current.toasts).toHaveLength(0);

    act(() => {
      result.current.removeAllToasts();
    });

    expect(result.current.toasts).toHaveLength(0);
  });
});
