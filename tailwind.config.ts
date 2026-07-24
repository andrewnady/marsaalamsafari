import type { Config } from 'tailwindcss';

/**
 * Brand tokens are lifted directly from the Marsa Alam Safari brand deck:
 * Deep Ocean Blue, Turquoise, Golden Sand, Desert Beige, Sunset Orange, Charcoal.
 * Fonts: Jost (display / logotype) + Manrope (body / UI).
 */
const config: Config = {
  content: [
    './src/app/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
    './src/content/**/*.{ts,tsx}',
    './src/lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        ocean: {
          DEFAULT: '#005F99',
          50: '#e6f1f8',
          100: '#cce3f0',
          600: '#005F99',
          700: '#004d7d',
          800: '#003a5e',
        },
        turquoise: {
          DEFAULT: '#19A7CE',
          light: '#4dc0de',
        },
        sand: {
          DEFAULT: '#D4A24C',
          dark: '#b8863a',
        },
        beige: {
          DEFAULT: '#F2E7C9',
          soft: '#FAF6ED',
        },
        sunset: {
          DEFAULT: '#E67E22',
        },
        charcoal: {
          DEFAULT: '#222222',
          soft: '#3a3a3a',
          muted: '#5a5a5a',
        },
      },
      fontFamily: {
        display: ['var(--font-jost)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans: ['var(--font-manrope)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        content: '1200px',
        prose: '68ch',
      },
      borderRadius: {
        xl: '0.875rem',
        '2xl': '1.25rem',
      },
      boxShadow: {
        card: '0 1px 3px rgba(34,34,34,0.06), 0 8px 24px -12px rgba(34,34,34,0.12)',
        'card-hover': '0 4px 12px rgba(34,34,34,0.08), 0 16px 40px -16px rgba(34,34,34,0.18)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) both',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};

export default config;
