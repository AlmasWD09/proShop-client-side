/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'primary':'#b91c1c', // red-700
        // 'primaryGray':'#fee2e2', // red-300
        // 'primary':'#22c55e', // red-700
        'secondery':'#f87171', // red-400
        'primaryGray' : '#fef2f2', // red-50
        'iconEdditColor':'green',
        'iconDelettColor':'red',
      },
      fontFamily: {
        'lato': "'Lato', 'sans-serif'",
      },
    },
  },
  plugins: [],
}