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
    fullScreen: {
      description: 'Display loading indicator in full screen mode',
      control: 'boolean',
    },
    label: {
      description: 'Label text for the loading indicator',
      control: 'text',
    },
    containerClassName: {
      description: 'Additional classes for the container',
      control: 'text',
    },
    labelClassName: {
      description: 'Additional classes for the label',
      control: 'text',
    },
  },

  decorators: [
    (Story) => (
      <div className="w-80 h-48 flex justify-center items-center">
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof LoadingIndicator>;

export const Default: Story = {
  args: {
    size: 'lg',
    fullScreen: false,
  },
};

export const WithLabel: Story = {
  args: {
    size: 'lg',
    fullScreen: false,
    label: 'Loading...',
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
    fullScreen: false,
  },
};

export const Medium: Story = {
  args: {
    size: 'md',
    fullScreen: false,
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    fullScreen: false,
  },
};

export const FullScreen: Story = {
  args: {
    size: 'lg',
    fullScreen: true,
    label: 'Loading...',
  },
};
