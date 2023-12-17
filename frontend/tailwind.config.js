/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    fontFamily: {
      sans: ["Urbanist", "sans-serif"],
    },
    colors: {
      'black': '#173303',
      'main': '#A1E777',
      'background': '#F9F9F9',
      'gray': '#F3F3F3',
      'gray2': '#BDBDBD',
      'darkGray': '#656565',
      'active': '#89D35C',
      'line': '#F0F0F0',
      'red': '#CD3939',
    },
    extend: {
    },
  },
  plugins: [],
}
