import { cn } from '@nextui-org/theme';

// Icons
import { BoxIcon, ShieldIcon, ThunderIcon } from '@/icons';

// Components
import BenefitItem from './BenefitItem';

const benefitsList = [
  {
    Icon: ShieldIcon,
    title: 'Secure Payments',
    description:
      'There are many variations of passages of alteration in some form.',
  },
  {
    Icon: BoxIcon,
    title: 'Free Shipping',
    description:
      'There are many variations of passages of alteration in some form.',
  },
  {
    Icon: ThunderIcon,
    title: '100% Satisfactions',
    description:
      'There are many variations of passages of alteration in some form.',
  },
];

const Benefits = () => (
  <section
    className={cn(
      'w-full bg-background-tertiary',
      'py-14 md:py-30 lg:py-30 2xl:py-21',
    )}
  >
    <div className="container mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 3xl:gap-[90]">
        {benefitsList.map((benefit, index) => (
          <BenefitItem key={index} {...benefit} />
        ))}
      </div>
    </div>
  </section>
);

export default Benefits;
