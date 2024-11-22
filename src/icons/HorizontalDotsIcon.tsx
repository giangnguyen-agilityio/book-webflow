import { CustomClassType } from '@/types';

export const HorizontalDotsIcon = ({
  customClass = 'w-6 h-6',
}: CustomClassType) => (
  <svg
    aria-label="Horizontal Dots Icon"
    className={customClass}
    fill="none"
    height={24}
    viewBox="0 0 24 6"
    width={24}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12.0003 1.01302C13.0128 1.01302 13.8337 1.83383 13.8337 2.84635C13.8337 3.85888 13.0128 4.67969 12.0003 4.67969C10.9878 4.67969 10.167 3.85888 10.167 2.84635C10.167 1.83383 10.9878 1.01302 12.0003 1.01302Z"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <path
      d="M21.1663 1.01302C22.1789 1.01302 22.9997 1.83383 22.9997 2.84635C22.9997 3.85888 22.1789 4.67969 21.1663 4.67969C20.1538 4.67969 19.333 3.85888 19.333 2.84635C19.333 1.83383 20.1538 1.01302 21.1663 1.01302Z"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <path
      d="M2.83333 1.01302C3.84586 1.01302 4.66667 1.83383 4.66667 2.84635C4.66667 3.85888 3.84586 4.67969 2.83333 4.67969C1.82081 4.67969 1 3.85888 1 2.84635C1 1.83383 1.82081 1.01302 2.83333 1.01302Z"
      stroke="currentColor"
      strokeWidth="1.5"
    />
  </svg>
);
