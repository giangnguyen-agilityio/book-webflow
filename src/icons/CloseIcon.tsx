import { CustomClassType } from '@/types';

export const CloseIcon = ({ customClass }: CustomClassType) => (
  <svg
    aria-label="Close Icon"
    className={customClass}
    fill="none"
    height={22}
    viewBox="0 0 22 22"
    width={22}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M21 1L1 21M21 21L1 1L21 21Z"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    />
  </svg>
);
