import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          maroon: '#651f2d',
          maroonDeep: '#3d1119',
          gold: '#d4af37',
          cream: '#f8f1e7',
          beige: '#e9ddcf',
          ink: '#191515'
        }
      },
      boxShadow: {
        luxe: '0 20px 60px rgba(61,17,25,0.16)',
        soft: '0 12px 30px rgba(25,21,21,0.08)'
      },
      backgroundImage: {
        'hero-maroon':
          'radial-gradient(circle at top left, rgba(212,175,55,0.18), transparent 35%), radial-gradient(circle at bottom right, rgba(101,31,45,0.16), transparent 38%), linear-gradient(135deg, #fffaf4 0%, #f7efe5 45%, #fbf7f1 100%)'
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' }
        },
        shimmer: {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' }
        }
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        shimmer: 'shimmer 1.6s linear infinite'
      }
    }
  },
  plugins: []
};

export default config;
