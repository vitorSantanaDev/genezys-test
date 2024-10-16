/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        background: {
          primary: '#111111',
          secondary: '#1B1B1B',
          tertiary: '#303030'
        },
        border: {
          primary: '#FFFFFF'
        },
        content: {
          primary: '#FFFFFF',
          body: '#E2E2E2',
          heading: '#C6C6C6',
          muted: '#5E5E5E',
          placeholder: '#777777',
          inverse: '#111111'
        },
        accent: {
          brand: '#C4F120',
          red: '#E61E32'
        },
        hover: {
          primary: '#A8D30D',
          secondary: '#111111',
          tertiary: '#303030'
        }
      },
      fontFamily: {
        sans: ['Schibsted Grotesk', 'sans-serif']
      },
      fontSize: {
        heading: ['24px', { lineHeight: '32px', fontWeight: '700' }],
        'text-large': ['16px', { lineHeight: '24px', fontWeight: '600' }],
        'text-medium': ['14px', { lineHeight: '22px', fontWeight: '500' }],
        'text-small': ['12px', { lineHeight: '20px', fontWeight: '400' }],
        'text-xsmall': ['10px', { lineHeight: '14px', fontWeight: '400' }],
        'label-medium': ['14px', { lineHeight: '22px', fontWeight: '400' }],
        'label-small': ['12px', { lineHeight: '20px', fontWeight: '400' }]
      }
    }
  },
  plugins: []
}
