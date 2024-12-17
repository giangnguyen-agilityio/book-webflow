import type { Meta, StoryObj } from '@storybook/react';

// Constants
import { IMAGE_BLUR_SRC } from '@/constants';

import ImageFallback from '.';

const meta: Meta<typeof ImageFallback> = {
  title: 'Components/ImageFallback',
  component: ImageFallback,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    width: 300,
    height: 300,
  },
  argTypes: {
    className: {
      description: 'Custom CSS classes for the image.',
    },
    src: {
      description: 'The image source URL.',
    },
    width: {
      description: 'The image width in pixels.',
    },
    height: {
      description: 'The image height in pixels.',
    },
    alt: {
      description: 'Alternative text for the image.',
    },
    blurDataURL: {
      description:
        'A base64 image used for a blurry placeholder during loading.',
      type: 'string',
    },
    fallbackSrc: {
      description: 'The fallback image URL for broken or failed image loading.',
      type: 'string',
    },
  },
};

export default meta;

type Story = StoryObj<typeof ImageFallback>;

export const Default: Story = {
  args: {
    src: '/images/background-image.webp',
    alt: 'imageSuccess',
  },
};

export const ErrorFallbackImage: Story = {
  args: {
    src: 'error',
    alt: 'imageError',
  },
};

export const BlurEffectImage: Story = {
  render: () => (
    <ImageFallback
      alt="Blur Example"
      blurDataURL={IMAGE_BLUR_SRC.DEFAULT}
      height={300}
      src="https://app.requestly.io/delay/3000/https://via.placeholder.com/300"
      width={300}
    />
  ),
};
