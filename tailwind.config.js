  // tailwind.config.js
  module.exports = {
   purge: ['./pages/**/*.js', './components/**/*.js'],
    darkMode: 'media', // or 'media' or 'class'
    theme: {
      extend: {
        colors: {
          black: '#111'
        }
      }
    },
    variants: {},
    plugins: []
  }