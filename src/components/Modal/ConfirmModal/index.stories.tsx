import { useArgs } from '@storybook/preview-api';
import type { Meta, StoryObj } from '@storybook/react';

// Components
import { ConfirmModal, Button } from '@/components';

const meta = {
  title: 'Components/ConfirmModal',
  component: ConfirmModal,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    title: {
      description: 'The title of the modal',
      control: 'text',
    },
    description: {
      description: 'The description of the modal',
      control: 'text',
    },
    isOpen: {
      description: 'The open state of the modal',
      control: 'boolean',
    },
    isLoading: {
      description: 'The loading state of the modal',
      control: 'boolean',
    },
    onConfirm: {
      description: 'The function to confirm the action',
      action: 'Confirmed',
    },
    onCancel: {
      description: 'The function to cancel the action',
      action: 'Canceled',
    },
  },
} satisfies Meta<typeof ConfirmModal>;

export default meta;

type Story = StoryObj<typeof ConfirmModal>;

export const Default: Story = {
  args: {
    isOpen: false,
    isLoading: false,
    title: 'Confirm',
    description: 'Are you sure you want to proceed?',
  },

  render: (args) => {
    const [isOpen, setIsOpen] = useArgs<typeof args>();

    const handleOpen = () => setIsOpen({ isOpen: true });
    const handleClose = () => setIsOpen({ isOpen: false });

    return (
      <>
        <Button className="text-text-primary" onPress={handleOpen}>
          Open Modal
        </Button>
        <ConfirmModal
          {...args}
          isOpen={isOpen.isOpen}
          onCancel={handleClose}
          onConfirm={handleClose}
        />
      </>
    );
  },
};
