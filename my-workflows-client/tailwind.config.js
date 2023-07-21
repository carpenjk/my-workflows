import colors from 'tailwindcss/colors';

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dk-bg': colors.slate['700'],
        'dk-text': colors.gray['200'],
      },
      width: {
        "navbar-collapsed": '3.2rem',
      },
      transitionProperty: {
        width: "width"
      },
      screens: {
        "3xl": "1792px",
      },
      fontFamily: {
        maven: ['Maven Pro', 'sans-serif'],
        roboto: ['RobotoMono', 'monospace']
      },
      animation: {
        text:'text 5s ease infinite',
        "bounce-once": 'bounce-once 0.35s ease 0s 1 normal forwards;'
      },
      backgroundSize: {
        "size-200": "200% 200%",
      },
      keyframes: {
        text: {
            "0%, 100%": {
                "background-size":'200% 200%',
                "background-position": 'left center'
            },
            '50%': {
                "background-size":'200% 200%',
                "background-position": 'right center'
            }
          },
          "bounce-once": {
            "0%": {
              transform: "translateY(0%)",
              "animation-timing-function": "ease-in",
            },
            "25%": {
              transform: "translateY(-4%)",
              "animation-timing-function": "ease-in",
            },
            "50%": {
              transform: "translateY(-8%)",
              "animation-timing-function": "ease-in",
            },
            "75%": {
              transform: "translateY(-4%)",
              "animation-timing-function": "ease-out",
            },
            "100%": {
              transform: "translateY(0%)",
              "animation-timing-function": "ease-out",
            },
          },   
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}