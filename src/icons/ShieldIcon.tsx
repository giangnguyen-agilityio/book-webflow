import { CustomClassType } from '@/types/components';

export const ShieldIcon = ({ customClass = 'w-6 h-6' }: CustomClassType) => (
  <svg
    aria-label="Shield Icon"
    className={customClass}
    fill="none"
    height={38}
    viewBox="0 0 38 38"
    width={38}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M25.9234 12.077L16.3349 23.1541L12.0771 18.9829"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    />
    <path
      d="M36.9224 6.57054C29.1841 5.18245 25.9847 4.15436 19.0001 1C12.0155 4.15436 8.81616 5.18245 1.07781 6.57054C-0.324127 28.7904 17.6657 36.463 19.0001 37.0004C20.3345 36.463 38.3243 28.7904 36.9224 6.57054Z"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    />
  </svg>
);
