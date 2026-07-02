import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          signature: '#A100FF',
          deep:      '#460073',
          mid:       '#7500C0',
          light:     '#E5CCFF',
          ghost:     '#F5EEFF',
        },
        neutral: {
          ink:     '#0F0F1A',
          slate:   '#4A4A5A',
          border:  '#E8E8F0',
          surface: '#F8F8FC',
        },
        semantic: {
          success:        '#00B388',
          warning:        '#FF6B35',
          error:          '#E8002D',
          'success-tint': '#E6F7F3',
          'warning-tint': '#FFF0EB',
          'error-tint':   '#FDEAEA',
        },
      },
      boxShadow: {
        card: '0 1px 4px rgba(70,0,115,0.06)',
      },
    },
  },
  plugins: [],
}

export default config