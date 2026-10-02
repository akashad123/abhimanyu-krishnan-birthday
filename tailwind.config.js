/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        theme: {
          sky: "#5299D3",
          skyDark: "#3A7FB9",
          cream: "#F6F2EA",
          creamLight: "#FCFAF6",
          red: "#E65046",
          redDark: "#C7382E",
          yellow: "#F5B738",
          green: "#65A765",
          blue: "#276092",
          navy: "#163A5C",
          rope: "#BF9056",
          ropeDark: "#8F6433",
          cloud: "#FFFFFF",
        },
      },
      fontFamily: {
        display: ['Fredoka', 'Quicksand', 'sans-serif'],
        body: ['Quicksand', 'system-ui', 'sans-serif'],
        accent: ['Caveat', 'cursive'],
      },
      boxShadow: {
        'plaque': '0 12px 30px -5px rgba(22, 58, 92, 0.18), 0 4px 10px rgba(0, 0, 0, 0.08)',
        'paper': '0 8px 20px -4px rgba(0, 0, 0, 0.12)',
        'balloon': 'inset -6px -6px 12px rgba(0, 0, 0, 0.15), inset 6px 6px 12px rgba(255, 255, 255, 0.4)',
      },
    },
  },
  plugins: [],
}
