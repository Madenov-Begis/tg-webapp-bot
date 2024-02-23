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
  // eslint-disable-next-line no-undef
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        light: {
          // eslint-disable-next-line @typescript-eslint/no-var-requires, no-undef
          ...require('daisyui/src/theming/themes')['light'],
          '.btn': {
            'background-color': '#1EA1F1',
            'border-color': '#1EA1F1',
            color: '#fff',
          },
          '.btn:hover': {
            'background-color': '#1C96E1',
            'border-color': '#1C96E1',
          },
        },
      },
    ],
  },
}
