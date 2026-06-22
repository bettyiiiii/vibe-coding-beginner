/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#E8F5F3',
          100: '#D1EBF7',
          200: '#A3D9E0',
          300: '#75C7C9',
          400: '#5BB5A2', // 主色
          500: '#4DA18E',
          600: '#3D8D7A',
          700: '#2D7966',
          800: '#1D6552',
          900: '#0D513E',
        },
        warm: {
          300: '#F9D4A6',
          400: '#F4A261', // 暖橙强调
          500: '#E8914A',
        },
        coral: '#E76F51',
        code: {
          bg: '#1E1E2E',
          text: '#CDD6F4',
        },
      },
      fontFamily: {
        sans: ['Poppins', 'Noto Sans SC', 'PingFang SC', 'Microsoft YaHei', 'sans-serif'],
        serif: ['Lora', 'Noto Serif SC', 'STSong', 'serif'],
        mono: ['Fira Code', 'JetBrains Mono', 'Consolas', 'monospace'],
      },
      borderRadius: {
        'btn': '12px',
        'card': '16px',
        'lg': '24px',
      },
      boxShadow: {
        card: '0 2px 12px rgba(0, 0, 0, 0.06)',
        'card-hover': '0 8px 24px rgba(0, 0, 0, 0.12)',
      },
      spacing: {
        '18': '4.5rem',
      },
    },
  },
  plugins: [],
}
