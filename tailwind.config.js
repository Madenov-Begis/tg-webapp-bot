/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', 'sans-serif'],
      },
      screens: {
        sm: '450px',
      },
      colors: {
        text: 'var(--tg-theme-text-color)',
        bg: 'var(--tg-theme-bg-color)',
        buttonBg: 'var(--tg-theme-button-color)',
        buttonText: 'var(--tg-theme-button-text-color)',
      },
      textColor: 'var(--tg-theme-text-color)',
    },
  },
  plugins: [],
}
