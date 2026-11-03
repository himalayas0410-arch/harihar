import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Warm Ivory & Porcelain Backgrounds
        ivory: {
          50: '#FDFBF7',
          100: '#FAF8F5',
          200: '#F5F1EA',
          300: '#EBE4D8',
          400: '#DDD2C1',
          500: '#C7B79F',
        },
        // Deep Forest Green (Primary Brand)
        forest: {
          50: '#EDF5F1',
          100: '#D7EBE1',
          200: '#B0D7C4',
          300: '#84BFA3',
          400: '#529E7B',
          500: '#32805E',
          600: '#236548',
          700: '#1D523B',
          800: '#1A3F2F',
          900: '#163528',
          950: '#0B1E16',
        },
        // Muted Sage Green
        sage: {
          50: '#F4F7F5',
          100: '#E6EEE9',
          200: '#CFDDD3',
          300: '#B2C7B9',
          400: '#8FAEA8',
          500: '#6D968F',
          600: '#547A73',
          700: '#43615C',
          800: '#384F4B',
          900: '#30423F',
        },
        // Warm Gold / Sand Accents
        sand: {
          50: '#FCF9F2',
          100: '#F7F0E0',
          200: '#EDE0C0',
          300: '#E0CC9C',
          400: '#D1B475',
          500: '#C19B52',
          600: '#A9813E',
          700: '#886433',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
      },
      boxShadow: {
        'premium': '0 10px 30px -5px rgba(22, 53, 40, 0.06), 0 4px 12px -2px rgba(22, 53, 40, 0.04)',
        'premium-hover': '0 20px 40px -10px rgba(22, 53, 40, 0.12), 0 8px 16px -4px rgba(22, 53, 40, 0.06)',
      },
    },
  },
  plugins: [],
};

export default config;
