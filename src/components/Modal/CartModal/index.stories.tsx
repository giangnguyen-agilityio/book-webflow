import type { Meta, StoryObj } from '@storybook/react';
import { useArgs } from '@storybook/preview-api';
import { action } from '@storybook/addon-actions';

// Mocks
import { MOCK_DEFAULT_BOOK_ITEM, MOCK_DEFAULT_CART_ITEMS } from '@/mock';

// Components
import { Button } from '@/components';

import CartModal from '.';

const meta = {
  title: 'Components/CartModal',
  component: CartModal,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    isOpen: {
      description: 'Controls the visibility of the modal',
      control: 'boolean',
    },
    onClose: {
      description: 'Function to close the modal',
    },
    cartItems: {
      description: 'Array of items in the cart',
      control: 'object',
    },
    onRemoveItem: {
      description: 'Function to remove an item from the cart',
    },
    onUpdateQuantity: {
      description: 'Function to update the quantity of an item',
    },
    onCheckout: {
      description: 'Function to initiate checkout',
    },
  },
} satisfies Meta<typeof CartModal>;

export default meta;

type Story = StoryObj<typeof CartModal>;

export const Default: Story = {
  render: (args) => {
    const [{ isOpen }, updateArgs] = useArgs();

    const handleOpen = () => updateArgs({ isOpen: true });
    const handleClose = () => {
      updateArgs({ isOpen: false });
    };

    return (
      <>
        <Button className="text-text-primary" onPress={handleOpen}>
          Open Cart
        </Button>
        <CartModal
          {...args}
          isOpen={isOpen}
          onCheckout={action('Initiated checkout')}
          onClose={handleClose}
          onRemoveItem={action('Removed item')}
          onUpdateQuantity={action('Updated quantity')}
        />
      </>
    );
  },
  args: {
    cartItems: MOCK_DEFAULT_CART_ITEMS,
  },
};

export const EmptyCart: Story = {
  ...Default,
  args: {
    ...Default.args,
    cartItems: [],
  },
};

export const SingleItem: Story = {
  ...Default,
  args: {
    ...Default.args,
    cartItems: [MOCK_DEFAULT_CART_ITEMS[0]],
  },
};

export const ManyItems: Story = {
  ...Default,
  args: {
    ...Default.args,
    cartItems: [
      ...MOCK_DEFAULT_CART_ITEMS,
      {
        ...MOCK_DEFAULT_BOOK_ITEM,
        id: '3',
        title: 'Third Book',
        price: 39.99,
        orderedQuantity: 3,
      },
      {
        ...MOCK_DEFAULT_BOOK_ITEM,
        id: '4',
        title: 'Fourth Book',
        price: 49.99,
        orderedQuantity: 1,
      },
    ],
  },
};
