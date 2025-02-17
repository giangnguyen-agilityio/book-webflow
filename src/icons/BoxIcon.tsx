import { CustomClassType } from '@/types';

export const BoxIcon = ({ customClass = 'w-6 h-6' }: CustomClassType) => (
  <svg
    aria-label="Box Icon"
    className={customClass}
    fill="none"
    height={44}
    viewBox="0 0 40 44"
    width={40}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M39 30.7789V13.8808C38.9993 13.3277 38.8538 12.7844 38.5779 12.3051C38.302 11.8257 37.9054 11.427 37.4276 11.1485L22.3859 2.39468C21.6612 1.97277 20.8376 1.75049 19.999 1.75049C19.1604 1.75049 18.3368 1.97277 17.6121 2.39468L2.57245 11.1485C2.09457 11.427 1.69795 11.8257 1.42207 12.3051C1.14619 12.7844 1.00067 13.3277 1 13.8808V30.7789C1.00033 31.3323 1.14568 31.876 1.42158 32.3557C1.69748 32.8354 2.09428 33.2345 2.57245 33.5131L17.6141 42.267C18.339 42.6883 19.1625 42.9102 20.001 42.9102C20.8394 42.9102 21.663 42.6883 22.3879 42.267L37.4295 33.5131C37.9073 33.2343 38.3037 32.8351 38.5793 32.3554C38.8548 31.8756 38.9999 31.3321 39 30.7789Z"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    />
    <path
      d="M19.9997 23.1215V42.9132M19.9997 23.1215L1.98926 12.6824M19.9997 23.1215L38.7028 12.6824"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    />
  </svg>
);
