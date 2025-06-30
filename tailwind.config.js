/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'Roboto', 'sans-serif'],
      },
      screens: {
        sm: '450px',
      },
      colors: {
        text: 'var(--tg-theme-text-color)',
        bg: 'var(--tg-theme-bg-color)',
        buttonBg: 'var(--tg-theme-button-color)',
        buttonText: 'var(--tg-theme-button-text-color)',
        primary: {
          50: '#eaf6fd',
          100: '#d4eafd',
          200: '#a8d5fa',
          300: '#7cc0f7',
          400: '#49A8E9',
          500: '#49A8E9',
          600: '#3493d6',
          700: '#2176b6',
          800: '#185a8c',
          900: '#123f61',
        },
        secondary: {
          50: '#fdf4ff',
          100: '#fae8ff',
          200: '#f5d0fe',
          300: '#f0abfc',
          400: '#e879f9',
          500: '#d946ef',
          600: '#c026d3',
          700: '#a21caf',
          800: '#86198f',
          900: '#701a75',
        },
        accent: {
          50: '#fefce8',
          100: '#fef9c3',
          200: '#fef08a',
          300: '#fde047',
          400: '#facc15',
          500: '#eab308',
          600: '#ca8a04',
          700: '#a16207',
          800: '#854d0e',
          900: '#713f12',
        }
      },
      textColor: 'var(--tg-theme-text-color)',
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-primary': 'linear-gradient(135deg, #49A8E9 0%, #7cc0f7 100%)',
        'gradient-secondary': 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        'gradient-accent': 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      },
      boxShadow: {
        'soft': '0 1px 4px 0 rgba(0,0,0,0.04)',
        'medium': '0 2px 8px 0 rgba(0,0,0,0.07)',
        'strong': '0 4px 16px 0 rgba(0,0,0,0.10)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'bounce-soft': 'bounceSoft 0.6s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        bounceSoft: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
      },
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
