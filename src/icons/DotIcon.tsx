import { CustomClassType } from '@/types';

export const DotIcon = ({ customClass }: CustomClassType) => (
  <svg
    aria-label="Dot Icon"
    className={customClass}
    fill="none"
    height={16}
    viewBox="0 0 16 16"
    width={16}
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="8" cy="8" fill="currentColor" r="8" />
  </svg>
);
