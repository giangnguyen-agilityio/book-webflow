// Utils
import { cn } from '@/utils';

// Components
import { Text } from '@/components';

interface MessageProps {
  title: string;
  description: string;
  classNames?: {
    wrapper?: string;
    title?: string;
    description?: string;
  };
}

const Message = ({ title, description, classNames = {} }: MessageProps) => (
  <div
    className={cn('text-center', classNames.wrapper)}
    data-testid="message-wrapper"
  >
    <Text
      textColor="text-primary"
      type="wrap"
      className={cn(
        'font-cardo text-3xl font-bold sm:text-4xl',
        classNames.title,
      )}
    >
      {title}
    </Text>
    <Text
      className={cn('mt-2 text-small md:text-sm', classNames.description)}
      textColor="text-foreground-200"
      type="wrap"
    >
      {description}
    </Text>
  </div>
);

export default Message;
