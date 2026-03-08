/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        techBlack: "#000000",
        techGraphite: "#0A0A0A",
        techElectric: "#00A3FF",
        techNeon: "#3B82F6",
        techWhite: "#FFFFFF",
        techGray: "#1F1F1F",
      },
      gridTemplateColumns: {
        'auto': 'repeat(auto-fit, minmax(200px, 1fr))'
      },
      boxShadow: {
        'neon': '0 0 15px rgba(0, 163, 255, 0.4)',
        'neon-hover': '0 0 25px rgba(0, 163, 255, 0.6)',
      },
      backgroundImage: {
        'tech-gradient': 'linear-gradient(135deg, rgba(10, 10, 10, 1) 0%, rgba(0, 0, 0, 1) 100%)',
      }
    },
  },
  plugins: [],
};
