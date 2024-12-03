import type { Meta, StoryObj } from '@storybook/react';

import ToastItem from './';

const meta: Meta<typeof ToastItem> = {
  title: 'Components/ToastItem',
  component: ToastItem,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    type: {
      description: 'The type of the toast message',
      options: ['success', 'error', 'info', 'warning'],
      control: 'select',
    },
    message: {
      description: 'The content of the toast message',
      control: 'text',
    },
    removeToast: {
      description: 'The callback to be executed when the toast is removed',
      action: 'Remove toast message',
    },
  },
  decorators: [
    (Story) => (
      <div className="flex justify-end">
        <div className="w-full max-w-sm">
          <Story />
        </div>
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof ToastItem>;

export const Success: Story = {
  args: {
    id: 1,
    type: 'success',
    message: 'This is a success message',
  },
};

export const Error: Story = {
  args: {
    id: 2,
    type: 'error',
    message: 'This is an error message',
  },
};

export const Info: Story = {
  args: {
    id: 3,
    type: 'info',
    message: 'This is an info message',
  },
};

export const Warning: Story = {
  args: {
    id: 4,
    type: 'warning',
    message: 'This is a warning message',
  },
};
