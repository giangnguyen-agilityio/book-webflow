import type { Meta, StoryObj } from '@storybook/react';

import NumberInput from '.';

const meta: Meta<typeof NumberInput> = {
  title: 'Components/NumberInput',
  component: NumberInput,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    placeholder: 'Enter a number',
    label: 'Number Input',
  },
  argTypes: {
    value: {
      description: 'The input value',
      control: 'text',
    },
    min: {
      description: 'Minimum value allowed',
      control: 'number',
    },
    max: {
      description: 'Maximum value allowed',
      control: 'number',
    },
    allowDecimal: {
      description: 'Allow decimal numbers',
      control: 'boolean',
    },
    allowNegative: {
      description: 'Allow negative numbers',
      control: 'boolean',
    },
    onChange: {
      description: 'Callback when value changes',
      action: 'changed',
    },
  },
};

export default meta;

type Story = StoryObj<typeof NumberInput>;

export const Default: Story = {
  args: {
    label: 'Basic Number Input',
  },
};

export const DecimalInput: Story = {
  args: {
    label: 'Decimal Input',
    allowDecimal: true,
    placeholder: 'Enter decimal number',
  },
};

export const NegativeNumberInput: Story = {
  args: {
    label: 'Negative Number Input',
    allowNegative: true,
    placeholder: 'Enter negative number',
  },
};

export const WithMinMax: Story = {
  args: {
    label: 'Number Input with Range',
    min: 0,
    max: 100,
    placeholder: 'Enter number (0-100)',
  },
};
