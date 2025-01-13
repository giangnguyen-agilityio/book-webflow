import { CustomClassType } from '@/types';

export const PlusIcon = ({ customClass = 'w-6 h-6' }: CustomClassType) => (
  <svg
    aria-label="Plus Icon"
    className={customClass}
    fill="none"
    height={24}
    viewBox="0 0 24 24"
    width={24}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 4V20M4 12H20"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    />
  </svg>
);
