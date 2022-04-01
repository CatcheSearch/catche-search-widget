module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{html,vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Arial', 'ui-sans-serif', 'system-ui'],
      },
      width: {
        128: '32rem',
      },
      boxShadow: {
        'catche': '1px 1px 3px 2px rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
      }
    },
  },
}