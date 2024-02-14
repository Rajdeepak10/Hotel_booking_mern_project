/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html",'./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
    container:{
      //override default container padding here rem means 1rem equals to font size of root html elemenent
      padding:{
        md: "10rem"
      },
    },
  },
  plugins: [],
}

