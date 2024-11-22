import { Meta, StoryObj } from '@storybook/react';

// Components
import Text from './index';

const meta: Meta<typeof Text> = {
  title: 'Components/Text',
  component: Text,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    children: {
      description: 'The text content to display.',
      control: 'text',
    },
    as: {
      description: 'The HTML tag for rendering the text.',
      control: { type: 'select' },
      options: ['span', 'p'],
    },
    size: {
      description: 'The predefined font size.',
      control: { type: 'select' },
      options: [
        'base',
        'sm',
        'md',
        'lg',
        'xl',
        '2xl',
        '3xl',
        '4xl',
        '5xl',
        '6xl',
        '7xl',
        '8xl',
        '9xl',
      ],
    },
    className: {
      description: 'Additional custom class names for styling.',
      control: 'text',
    },
    textColor: {
      description: 'The text color using TailwindCSS classes.',
      control: 'text',
    },
    customSize: {
      description:
        'Custom font size (e.g., `text-4xl`). Overrides `size` if provided.',
      control: 'text',
    },
    type: {
      description: 'Text wrapping behavior.',
      control: { type: 'select' },
      options: ['wrap', 'nowrap'],
    },
  },
} satisfies Meta<typeof Text>;

export default meta;

type Story = StoryObj<typeof Text>;

export const Sizes: Story = {
  render: () => (
    <div className="w-full flex flex-col gap-4 items-center">
      <Text>Base size text</Text>
      <Text size="sm">Small text</Text>
      <Text size="md">Medium text</Text>
      <Text size="lg">Large text</Text>
      <Text size="xl">Extra Large text</Text>
      <Text size="3xl">3XL size text</Text>
      <Text size="4xl">4XL size text</Text>
      <Text size="5xl">5XL size text</Text>
      <Text size="6xl">6XL size text</Text>
      <Text size="7xl">7XL size text</Text>
      <Text size="8xl">8XL size text</Text>
      <Text size="9xl">9XL size text</Text>
    </div>
  ),
};

export const WithTruncate: Story = {
  render: () => (
    <div className="w-60 border flex flex-col p-2 gap-4">
      <Text type="wrap">This text will wrap to fit the container.</Text>
      <Text>This text will not wrap but truncate when too long.</Text>
    </div>
  ),
};

export const WithoutTruncate: Story = {
  render: () => (
    <div className="w-60 border flex flex-col p-2 gap-4">
      <Text type="wrap">
        This text will not wrap but truncate when too long.
      </Text>
    </div>
  ),
};
