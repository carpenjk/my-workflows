import colors from 'tailwindcss/colors';
import {screens} from './src/features/theme/screensExtension'
 
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        'dk-primary': {
          95: colors.slate['950'],
          9: colors.slate['900'],
          8: colors.slate['800'],
          7: colors.slate['700'],
          6: colors.slate['600'],
          5: colors.slate['500'],
          4: colors.slate['400'],
          3: colors.slate['300'],
          2: colors.slate['200'],
          1: colors.slate['100'],
          "05": colors.slate['50']
        },
        'primary': {
          95: colors.slate['50'],
          9: colors.slate['100'],
          8: colors.slate['200'],
          7: colors.slate['300'],
          6: colors.slate['400'],
          5: colors.slate['500'],
          4: colors.slate['600'],
          3: colors.slate['700'],
          2: colors.slate['800'],
          1: colors.slate['900'],
        },
        'dk-secondary': {
          95: colors.sky['950'],
          9: colors.sky['900'],
          8: colors.sky['800'],
          7: colors.sky['700'],
          6: colors.sky['600'],
          5: colors.sky['500'],
          4: colors.sky['400'],
          3: colors.sky['300'],
          2: colors.sky['200'],
          1: colors.sky['100'],
        },
        'secondary': {
          9: colors.sky['100'],
          8: colors.sky['200'],
          7: colors.sky['300'],
          6: colors.sky['400'],
          5: colors.sky['500'],
          4: colors.sky['600'],
          3: colors.sky['700'],
          2: colors.sky['800'],
          1: colors.sky['900'],
        },
        'text': {
          normal: colors.gray['600']
        },
        'dk-text': {
          normal: colors.gray['200'],
        },
        'link': colors.teal
      },
      width: {
        "navbar-collapsed": '3.2rem',
      },
      transitionProperty: {
        width: "width"
      },
      screens: screens,
      fontFamily: {
        maven: ['Maven Pro', 'sans-serif'],
        roboto: ['RobotoMono', 'monospace']
      },
      animation: {
        text:'text 5s ease infinite',
        "bounce-once": 'bounce-once 0.35s ease 0s 1 normal forwards;',
        "bounce-down": 'bounce-down 0.35s ease 0s 1 normal forwards;'
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
          "bounce-down": {
            "0%": {
              transform: "translateY(0%)",
              "animation-timing-function": "ease-in",
            },
            "25%": {
              transform: "translateY(4%)",
              "animation-timing-function": "ease-in",
            },
            "50%": {
              transform: "translateY(8%)",
              "animation-timing-function": "ease-in",
            },
            "75%": {
              transform: "translateY(4%)",
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
    require('@tailwindcss/forms', require('flowbite/plugin')),
  ],
}