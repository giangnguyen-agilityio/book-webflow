import { CustomClassType } from '@/types';

export const LeftArrowIcon = ({ customClass }: CustomClassType) => (
  <svg
    aria-label="Left Arrow Icon"
    className={customClass}
    fill="none"
    height={14}
    viewBox="0 0 9 14"
    width={9}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M8 13L2 7L8 1" stroke="currentColor" strokeWidth="2" />
  </svg>
);
