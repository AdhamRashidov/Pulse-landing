/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Fon va sirtlar — och shkala (Attio uslubi; Pulse skrinshotlari ham och).
        // Nomlar semantik: 950 = sahifa foni, 900 = karta, 850..700 = tobora to'qroq sirtlar.
        ink: {
          950: '#FAFAF9',
          900: '#FFFFFF',
          850: '#F4F4F2',
          800: '#EDEDEA',
          700: '#E2E2DE',
        },
        // Matn
        fg: {
          DEFAULT: '#0B0B0C',
          muted: '#55595F',
          dim: '#8A8E94',
        },
        // Pulse ilovasining brend rangi (apps/web — cyan). Och fonda o'qilishi uchun 600.
        accent: {
          DEFAULT: '#0891B2',
          strong: '#0E7490',
          soft: 'rgba(8, 145, 178, 0.09)',
        },
        // Birinchi aloqa svetofori — ilovadagi ma'no bilan bir xil
        hot: '#059669',
        warm: '#D97706',
        late: '#E11D48',
        // Chiziqlar: border-line, bg-line (gap-px kataklar), divide-line
        line: 'rgba(11, 11, 12, 0.08)',
        'line-strong': 'rgba(11, 11, 12, 0.14)',
      },
      fontFamily: {
        sans: ['Geist', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"Geist Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      letterSpacing: {
        tightest: '-0.045em',
      },
      maxWidth: {
        page: '76rem',
      },
      keyframes: {
        trace: {
          from: { strokeDashoffset: '1' },
          to: { strokeDashoffset: '0' },
        },
        blip: {
          '0%, 100%': { opacity: '0.35', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.35)' },
        },
      },
      animation: {
        trace: 'trace 2.4s cubic-bezier(0.65, 0, 0.35, 1) forwards',
        blip: 'blip 2.2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
