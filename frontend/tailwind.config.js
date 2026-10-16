/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Paleta central da marca MenteLab (derivada do logótipo CruzaMente).
        // Alterar aqui propaga para todo o site.
        navy: {
          DEFAULT: '#1e2a4a', // azul-marinho — confiança e profissionalismo
          50: '#f3f5f9',
          100: '#e4e9f2',
          200: '#c3cde0',
          300: '#9aabc9',
          400: '#6b82ac',
          500: '#4a6090',
          600: '#394b74',
          700: '#2c3a5c',
          800: '#1e2a4a',
          900: '#141c33',
          950: '#0c1222',
        },
        brand: {
          DEFAULT: '#2563eb', // azul vivo — destaque e ações principais
          50: '#eff5ff',
          100: '#dbe8fe',
          200: '#bfd6fe',
          300: '#93bbfd',
          400: '#609afa',
          500: '#3b78f6',
          600: '#2563eb',
          700: '#1d4fd7',
          800: '#1e42ae',
          900: '#1e3a89',
        },
        accent: {
          DEFAULT: '#14b8a6', // turquesa — pequenos detalhes visuais
          50: '#f0fdfa',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#14b8a6',
          600: '#0d9488',
          700: '#0f766e',
        },
      },
      fontFamily: {
        heading: ['Poppins', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        'fade-in-up': 'fade-in-up 0.6s ease-out both',
        'fade-in': 'fade-in 0.8s ease-out both',
      },
    },
  },
  plugins: [],
}
