/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/modules/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // NEXUSClinicalTheme v4 Colors
        'deep-navy': {
          DEFAULT: '#0A0F24',
          50: '#1A2845',
          100: '#141E35',
          900: '#050812',
        },
        'medical-teal': {
          DEFAULT: '#00C2CB',
          50: '#E5F9FA',
          100: '#B3F0F4',
          200: '#80E7ED',
          300: '#4DDEE6',
          400: '#1AD5DF',
          500: '#00C2CB',
          600: '#009BA2',
          700: '#007479',
          800: '#004D50',
          900: '#002627',
        },
        graphite: {
          DEFAULT: '#3A3F58',
          50: '#8B91B0',
          100: '#7D83A5',
          200: '#6B7290',
          300: '#5A607B',
          400: '#4A4F69',
          500: '#3A3F58',
          600: '#2C3041',
          700: '#1E212A',
          800: '#101213',
          900: '#020203',
        },
        'ice-gray': {
          DEFAULT: '#F6F8FA',
          50: '#FFFFFF',
          100: '#FFFFFF',
          200: '#FFFFFF',
          300: '#FFFFFF',
          400: '#FEFEFF',
          500: '#F6F8FA',
          600: '#D9E1E8',
          700: '#BCC9D6',
          800: '#9FB2C4',
          900: '#829BB2',
        },
      },
      fontFamily: {
        sans: ['Inter', 'Segoe UI', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
      },
      boxShadow: {
        'teal-glow': '0 0 20px rgba(0, 194, 203, 0.15)',
        'teal-glow-lg': '0 0 40px rgba(0, 194, 203, 0.25)',
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
      },
      backdropBlur: {
        xs: '2px',
      },
      transitionDuration: {
        '180': '180ms',
        '250': '250ms',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-in': 'slideIn 0.25s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
