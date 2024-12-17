import { Meta, StoryObj } from '@storybook/react';

// components
import Pagination from '.';

const meta: Meta<typeof Pagination> = {
  title: 'Components/Pagination',
  component: Pagination,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    total: {
      description: 'Total number of pages',
    },
  },
  args: {
    total: 10,
  },
};

export default meta;

type Story = StoryObj<typeof Pagination>;

export const Default: Story = {};
