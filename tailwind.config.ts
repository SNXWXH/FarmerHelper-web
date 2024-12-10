import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
      fontFamily: {
        nanumHeavy: ['NanumSquareNeoHeavy', 'sans-serif'],
      },
      fontWeight: {
        heavy: '900',
      },
      animation: {
        spin: 'spin 2s linear infinite',
        skeleton: 'skeleton-loading 1.5s infinite ease-in-out',
      },
      keyframes: {
        spin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'skeleton-loading': {
          '0%': { backgroundColor: '#f3f3f3' },
          '50%': { backgroundColor: '#e0e0e0' },
          '100%': { backgroundColor: '#f3f3f3' },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
