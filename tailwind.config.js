/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}"
  ],
  theme: {
    extend: {
      fontSize: {
        'xs':  ['14px', { lineHeight: '1.6' }],
        'sm':  ['16px', { lineHeight: '1.7' }],
        'base':['18px', { lineHeight: '1.75' }],
        'lg':  ['20px', { lineHeight: '1.75' }],
        'xl':  ['23px', { lineHeight: '1.6' }],
        '2xl': ['27px', { lineHeight: '1.4' }],
        '3xl': ['33px', { lineHeight: '1.3' }],
        '4xl': ['40px', { lineHeight: '1.2' }],
        '5xl': ['52px', { lineHeight: '1.1' }],
        '6xl': ['64px', { lineHeight: '1.05' }],
      },
      colors: {
        cife: {
          primary:    '#2A8C7A',
          dark:       '#1A6B5A',
          light:      '#5BBCAA',
          soft:       '#E8F7F4',
          bg:         '#F5FAFA',
          border:     '#D0ECE7',
          text:       '#1C2B2A',
          muted:      '#4A6B66',
        }
      },
      fontFamily: {
        sans: ['DM Sans', 'sans-serif'],
        display: ['DM Serif Display', 'serif'],
      }
    },
  },
  plugins: [],
}