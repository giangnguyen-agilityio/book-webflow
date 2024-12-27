import type { Meta, StoryObj } from '@storybook/react';

// Components
import Message from '.';

const meta: Meta<typeof Message> = {
  title: 'Components/Message',
  component: Message,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    title: {
      description: 'The main heading text of the message',
      control: 'text',
    },
    description: {
      description: 'The supporting text that appears below the title',
      control: 'text',
    },
    classNames: {
      description:
        'Object containing custom CSS classes for different parts of the component',
      control: 'object',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Message>;

export const Default: Story = {
  args: {
    title: 'Welcome to Our Store',
    description: 'Discover amazing books and articles in our collection',
  },
};

export const WithCustomClasses: Story = {
  args: {
    title: 'Custom Styled Message',
    description: 'This message has custom styling applied',
    classNames: {
      wrapper: 'bg-gray-100 p-6 rounded-lg',
      title: 'text-blue-600',
      description: 'text-gray-600 italic',
    },
  },
};

export const LongContent: Story = {
  args: {
    title: 'A Very Long Title That Might Wrap to Multiple Lines',
    description:
      'This is a much longer description that contains more text to demonstrate how the component handles longer content blocks and maintains proper spacing and alignment. The text will automatically wrap while maintaining readability.',
  },
};
