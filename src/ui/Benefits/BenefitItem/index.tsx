import { ElementType } from 'react';
import { cn } from '@nextui-org/theme';

// Components
import { Heading, Text } from '@/components';

interface BenefitItemProps {
  Icon: ElementType;
  title: string;
  description: string;
}

const BenefitItem = ({ Icon, title, description }: BenefitItemProps) => (
  <div className="flex flex-col items-center text-center">
    <div className="w-20 h-20 flex items-center justify-center mb-5 bg-background-primary">
      <Icon customClass="w-9 h-9 text-text-default" />
    </div>

    <Heading
      as="h3"
      className={cn(
        'font-cardo font-bold mb-2.5',
        'text-text-primary text-3xl lg:text-5xl',
      )}
    >
      {title}
    </Heading>

    <Text
      type="wrap"
      className={cn(
        'max-w-[365] font-inter font-normal',
        'text-text-primary text-base md:text-lg',
      )}
    >
      {description}
    </Text>
  </div>
);

export default BenefitItem;
