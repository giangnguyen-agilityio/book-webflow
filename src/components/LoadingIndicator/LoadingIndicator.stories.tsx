import type { Meta, StoryObj } from '@storybook/react';

// Components
import LoadingIndicator from './index';

const meta: Meta<typeof LoadingIndicator> = {
  title: 'Components/LoadingIndicator',
  component: LoadingIndicator,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    size: {
      description: 'Change the size of the loading indicator',
      options: ['sm', 'md', 'lg'],
      control: { type: 'select' },
    },
  },

  decorators: [
    (Story) => (
      <div className="w-80 h-48">
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof LoadingIndicator>;

export const Default: Story = {
  args: { size: 'lg' },
  render: () => <LoadingIndicator />,
};

export const Small: Story = {
  args: { size: 'sm' },
  render: () => <LoadingIndicator size="sm" />,
};

export const Medium: Story = {
  args: { size: 'md' },
  render: () => <LoadingIndicator size="md" />,
};

export const Large: Story = {
  args: { size: 'lg' },
  render: () => <LoadingIndicator size="lg" />,
};
