import { Meta, StoryObj } from '@storybook/react';

// Components
import Heading from './index';

const meta: Meta<typeof Heading> = {
  title: 'Components/Heading',
  component: Heading,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    children: {
      description: 'Text content',
      control: 'text',
    },
    as: {
      description: 'HTML tag',
      control: { type: 'select' },
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
    },
    size: {
      description: 'Size of heading',
      control: { type: 'select' },
      options: ['base', 'sm', 'md', 'lg', 'xl'],
    },
    className: {
      description: 'Additional class name',
      control: 'text',
    },
  },
} satisfies Meta<typeof Heading>;

export default meta;

type Story = StoryObj<typeof Heading>;

export const Default: Story = {
  args: {
    children: 'This is a heading',
    as: 'h2',
    size: 'lg',
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="w-full flex flex-col gap-10 items-center">
      <Heading as="h1" size="xl">
        (xl) This is a heading
      </Heading>
      <Heading as="h2" size="lg">
        (lg) This is a heading
      </Heading>
      <Heading as="h3" size="md">
        (md) This is a heading
      </Heading>
      <Heading as="h4" size="sm">
        (sm) This is a heading
      </Heading>
      <Heading as="h5">(base) This is a heading</Heading>
    </div>
  ),
};
