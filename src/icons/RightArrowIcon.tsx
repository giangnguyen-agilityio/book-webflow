import { CustomClassType } from '@/types';

export const RightArrowIcon = ({ customClass }: CustomClassType) => (
  <svg
    aria-label="Right Arrow Icon"
    className={customClass}
    fill="none"
    height={15}
    viewBox="0 0 9 15"
    width={9}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M1 1L7.5 7.5L1 14" stroke="currentColor" strokeWidth="2" />
  </svg>
);
