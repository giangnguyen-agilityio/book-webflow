import { ElementType } from 'react';

// Utils
import { cn } from '@/utils';

// Components
import { Heading, Text } from '@/components';

interface BenefitItemProps {
  Icon: ElementType;
  title: string;
  description: string;
}

const BenefitItem = ({ Icon, title, description }: BenefitItemProps) => (
  <div className="flex flex-col items-center text-center">
    <div className="w-20 h-20 flex items-center justify-center mb-5 bg-background-200">
      <Icon customClass="w-9 h-9 text-background" />
    </div>

    <Heading
      as="h3"
      className={cn('font-cardo font-bold mb-2.5', 'text-3xl lg:text-5xl')}
      textColor="text-primary"
    >
      {title}
    </Heading>

    <Text
      textColor="text-primary"
      type="wrap"
      className={cn(
        'max-w-[365px] font-inter font-normal',
        'text-base md:text-lg',
      )}
    >
      {description}
    </Text>
  </div>
);

export default BenefitItem;
