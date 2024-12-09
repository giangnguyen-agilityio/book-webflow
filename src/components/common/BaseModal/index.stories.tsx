import { useArgs } from '@storybook/preview-api';
import type { Meta, StoryObj } from '@storybook/react';

// Components
import { BaseModal, Button } from '@/components';

const meta = {
  title: 'Components/BaseModal',
  component: BaseModal,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    children: {
      description: 'The modal content',
    },
    isOpen: {
      description: 'The open state of the modal',
      control: 'boolean',
    },
    onClose: {
      description: 'The function to close the modal',
      action: 'Closed the modal',
    },
    placement: {
      description: 'The placement of the modal',
    },
  },
} satisfies Meta<typeof BaseModal>;

export default meta;

type Story = StoryObj<typeof BaseModal>;

export const Default: Story = {
  render: (args) => {
    const [isOpen, setIsOpen] = useArgs<typeof args>();

    const handleOpen = () => setIsOpen({ isOpen: true });
    const handleClose = () => setIsOpen({ isOpen: false });

    return (
      <>
        <Button color="default" onPress={handleOpen}>
          Open Modal
        </Button>
        <BaseModal
          {...args}
          hideCloseButton={false}
          isOpen={isOpen.isOpen}
          onClose={handleClose}
        />
      </>
    );
  },
  args: {
    children: <div className="p-6">This is the modal content</div>,
  },
};
