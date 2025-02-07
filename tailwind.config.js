module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      sans: ['Poppins', 'sans-serif','Playfair','Wix Madefor Display'],
    },
    
    extend: {

      backdropBlur: {
        xs: '2px',
        sm: '4px',
        md: '8px',
        lg: '12px',
        xl: '20px',
        '2xl': '30px',
      }
    },
    variants: {
      extend: {
        backdropBlur: ['responsive'],
      }
  },
  plugins: [],
};
