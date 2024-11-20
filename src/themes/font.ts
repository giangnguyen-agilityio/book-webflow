import { Inter, Cardo } from 'next/font/google';

export const inter = Inter({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-inter',
});

export const cardo = Cardo({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-cardo',
});

export const fontSize = {
  base: '1rem', // 16px
  sm: '1.0625rem', // 17px
  md: '1.125rem', // 18px
  lg: '1.1875rem', // 19px
  xl: '1.25rem', // 20px
  '2xl': '1.375rem', // 22px
  '3xl': '1.5rem', // 24px
  '4xl': '1.875rem', // 30px
  '5xl': '2rem', // 32px
  '6xl': '2.1875rem', // 35px
  '7xl': '2.5rem', // 40px
  '8xl': '2.8125rem', // 45px
  '9xl': '3.125rem', // 50px
};
