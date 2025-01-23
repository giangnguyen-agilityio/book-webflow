import type { Meta, StoryObj } from '@storybook/react';
import { useArgs } from '@storybook/preview-api';
import type { ChangeEvent } from 'react';

import NumberInput from '.';

const meta = {
  title: 'Components/NumberInput',
  component: NumberInput,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    placeholder: 'Enter a number',
    label: 'Number Input',
    value: '',
  },
  argTypes: {
    value: {
      control: 'text',
      description: 'The input value',
    },
    min: {
      control: 'number',
      description: 'Minimum value allowed',
    },
    max: {
      control: 'number',
      description: 'Maximum value allowed',
    },
    allowDecimal: {
      control: 'boolean',
      description: 'Allow decimal numbers',
    },
    allowNegative: {
      control: 'boolean',
      description: 'Allow negative numbers',
    },
    onChange: {
      action: 'changed',
      description: 'Callback when value changes',
    },
    label: {
      control: 'text',
      description: 'Label for the input',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
    },
  },
} satisfies Meta<typeof NumberInput>;

export default meta;
type Story = StoryObj<typeof NumberInput>;

const NumberInputWithArgs = (args: Story['args']) => {
  const [{ value }, updateArgs] = useArgs();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    updateArgs({ value: e.target.value });
    args?.onChange?.(e);
  };

  return <NumberInput {...args} value={value} onChange={handleChange} />;
};

export const Default: Story = {
  render: NumberInputWithArgs,
  args: {
    label: 'Basic Number Input',
  },
};

export const DecimalInput: Story = {
  render: NumberInputWithArgs,
  args: {
    label: 'Decimal Input',
    allowDecimal: true,
    placeholder: 'Enter decimal number',
  },
};

export const NegativeNumberInput: Story = {
  render: NumberInputWithArgs,
  args: {
    label: 'Negative Number Input',
    allowNegative: true,
    placeholder: 'Enter negative number',
  },
};
