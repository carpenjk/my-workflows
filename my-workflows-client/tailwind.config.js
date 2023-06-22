/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        maven: ['Maven Pro', 'sans-serif']
      },
      animation: {
        text:'text 5s ease infinite',
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
    }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}