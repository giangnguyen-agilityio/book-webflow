import { Meta, StoryObj } from '@storybook/react';

// Types
import { CustomClassType } from '@/types';

// Icons
import {
  BoxIcon,
  CartIcon,
  CloseIcon,
  DotIcon,
  FacebookIcon,
  HorizontalDotsIcon,
  InstagramIcon,
  LeftArrowIcon,
  LinkedInIcon,
  LoadingIcon,
  LogoIcon,
  NotFoundIcon,
  RightArrowIcon,
  ShieldIcon,
  ThunderIcon,
  TwitterIcon,
  EyeFilledIcon,
  EyeSlashFilledIcon,
  LogOutIcon,
  PlusIcon,
  EditIcon,
  TrashIcon,
} from '@/icons';

const icons = [
  { component: BoxIcon, label: 'Box' },
  { component: CartIcon, label: 'Cart' },
  { component: CloseIcon, label: 'Close' },
  { component: DotIcon, label: 'Dot' },
  { component: FacebookIcon, label: 'Facebook' },
  { component: HorizontalDotsIcon, label: 'Horizontal Dots' },
  { component: InstagramIcon, label: 'Instagram' },
  { component: LeftArrowIcon, label: 'Left Arrow' },
  { component: LinkedInIcon, label: 'LinkedIn' },
  { component: LoadingIcon, label: 'Loading' },
  { component: RightArrowIcon, label: 'Right Arrow' },
  { component: ShieldIcon, label: 'Shield' },
  { component: ThunderIcon, label: 'Thunder' },
  { component: TwitterIcon, label: 'Twitter' },
  { component: NotFoundIcon, label: 'Not Found' },
  { component: EyeFilledIcon, label: 'Eye Filled' },
  { component: EyeSlashFilledIcon, label: 'Eye Slash Filled' },
  { component: LogOutIcon, label: 'Log Out' },
  { component: PlusIcon, label: 'Plus' },
  { component: EditIcon, label: 'Edit' },
  { component: TrashIcon, label: 'Trash' },
];

const meta: Meta = {
  title: 'Components/IconGallery',
  component: BoxIcon,
  tags: ['autodocs'],
  parameters: {
    controls: { expanded: true },
  },
  argTypes: {
    customClass: {
      control: { type: 'text' },
      description: 'Custom CSS class via TailwindCSS for styling the icon',
    },
  },
};

export default meta;

type Story = StoryObj<{ customClass: string }>;

const IconGallery = ({ customClass }: CustomClassType) => (
  <div className="flex flex-col gap-4">
    <span className="font-semibold">Logo:</span>
    <LogoIcon />

    <span className="font-semibold">Icons:</span>
    <div className="grid grid-cols-6 gap-4 border">
      {icons.map(({ component: IconComponent, label }, index) => (
        <div
          key={index}
          className="flex flex-col items-center gap-2 p-4 text-black cursor-pointer"
        >
          <IconComponent customClass={customClass} />
          <span className="text-sm text-center mt-2">{label}</span>
        </div>
      ))}
    </div>
  </div>
);

export const Default: Story = {
  render: () => <IconGallery customClass="w-6 h-6" />,
};
