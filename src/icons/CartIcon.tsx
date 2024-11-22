import { CustomClassType } from '@/types';

export const CartIcon = ({ customClass = 'w-6 h-6' }: CustomClassType) => (
  <svg
    aria-label="Cart Icon"
    className={customClass}
    fill="none"
    height={24}
    viewBox="0 0 25 24"
    width={25}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M1.25 1.25H5.25L7.93 14.64C8.02144 15.1004 8.27191 15.514 8.63755 15.8083C9.00318 16.1026 9.4607 16.259 9.93 16.25H19.65C20.1193 16.259 20.5768 16.1026 20.9425 15.8083C21.3081 15.514 21.5586 15.1004 21.65 14.64L23.25 6.25H6.25M10.25 21.25C10.25 21.8023 9.80228 22.25 9.25 22.25C8.69772 22.25 8.25 21.8023 8.25 21.25C8.25 20.6977 8.69772 20.25 9.25 20.25C9.80228 20.25 10.25 20.6977 10.25 21.25ZM21.25 21.25C21.25 21.8023 20.8023 22.25 20.25 22.25C19.6977 22.25 19.25 21.8023 19.25 21.25C19.25 20.6977 19.6977 20.25 20.25 20.25C20.8023 20.25 21.25 20.6977 21.25 21.25Z"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    />
  </svg>
);
