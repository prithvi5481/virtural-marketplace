/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#a21caf', // fuchsia-700
          dark: '#f472b6',  // pink-400
        },
        accent: {
          light: '#06b6d4', // cyan-500
          dark: '#0ea5e9',  // sky-500
        },
        background: {
          light: '#fdf6f0', // warm light
          dark: '#18181b',
        },
        surface: {
          light: '#fff7ed', // orange-50
          dark: '#27272a',
        },
        text: {
          light: '#312e81', // indigo-900
          dark: '#f3f4f6',
        },
        border: {
          light: '#fbbf24', // amber-400
          dark: '#a3e635', // lime-400
        },
        error: {
          light: '#e11d48', // rose-600
          dark: '#fb7185', // rose-400
        },
      },
    },
  },
  plugins: [],
}
