import type { Meta, StoryObj } from '@storybook/react';

// Contexts
import { ToastProvider, useToast } from '@/context';

// Components
import { Button, Toast as ToastComponent } from '@/components';

const Toast = () => {
  const { addToast } = useToast();

  const showToast = (type: 'success' | 'error' | 'info' | 'warning') => {
    addToast(`This is a ${type} message!`, type);
  };

  const buttons = [
    { type: 'success', color: 'success' } as const,
    { type: 'error', color: 'danger' } as const,
    { type: 'info', color: 'secondary' } as const,
    { type: 'warning', color: 'primary' } as const,
  ];

  return (
    <>
      <div className="flex space-x-2 mb-4">
        {buttons.map(({ type, color }) => (
          <Button
            key={type}
            className="text-text-default"
            color={color}
            variant="solid"
            onPress={() => showToast(type)}
          >
            {`Show ${type}`}
          </Button>
        ))}
      </div>
      <ToastComponent />
    </>
  );
};

const meta: Meta<typeof Toast> = {
  title: 'Components/Toast',
  component: Toast,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <ToastProvider>
        <Story />
      </ToastProvider>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof Toast>;

export const Default: Story = {
  render: () => <Toast />,
};
