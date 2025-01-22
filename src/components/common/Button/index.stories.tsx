import type { Meta, StoryObj } from '@storybook/react';
import { Spinner } from '@heroui/react';

// Icons
import { InstagramIcon } from '@/icons';

// Components
import { Button } from '.';

const meta = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: [
        'bordered',
        'outline',
        'solid',
        'faded',
        'light',
        'flat',
        'ghost',
        'shadow',
      ],
    },
    color: {
      control: { type: 'select' },
      options: [
        'default',
        'primary',
        'secondary',
        'danger',
        'success',
        'warning',
      ],
    },
    disabled: {
      control: 'boolean',
    },
    size: {
      control: { type: 'select' },
      options: ['md', 'lg', 'xl', '2xl', '3xl'],
    },
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: 'Button',
    variant: 'outline',
  },
};

export const Primary: Story = {
  args: {
    children: 'Button',
    variant: 'solid',
    color: 'default',
  },
};

export const Secondary: Story = {
  args: {
    children: 'Button',
    variant: 'solid',
    color: 'secondary',
  },
};

export const Text: Story = {
  args: {
    children: 'Button',
    variant: 'light',
  },
};

export const OnlyIcon: Story = {
  args: {
    children: 'X',
    variant: 'solid',
    color: 'default',
    radius: 'full',
    isIconOnly: true,
  },
};

export const WithIcon: Story = {
  args: {
    children: 'Button',
    variant: 'solid',
    color: 'default',
    startContent: <InstagramIcon />,
  },
};

export const Loading: Story = {
  args: {
    children: 'Button',
    variant: 'solid',
    color: 'default',
    isLoading: true,
    spinner: <Spinner size="sm" />,
  },
};

export const Disabled: Story = {
  args: {
    children: 'Button',
    disabled: true,
  },
};
