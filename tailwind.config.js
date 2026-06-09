/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0F2D52",
        "primary-light": "#1E4A7A",
        "primary-dark": "#0A1E36",
        secondary: "#E79B23",
        "secondary-light": "#F3B13F",
        "secondary-dark": "#C87E08",
        background: "#F4F7FA",
        surface: "#FFFFFF",
        "surface-hover": "#F8FAFC",
        "text-primary": "#0B1F3A",
        "text-secondary": "#667085",
        "text-muted": "#98A2B3",
        "text-white": "#FFFFFF",
        success: "#16A34A",
        "success-bg": "#DCFCE7",
        warning: "#CA8A04",
        "warning-bg": "#FEF3C7",
        info: "#2563EB",
        "info-bg": "#DBEAFE",
        border: "#D0D5DD",
        "border-light": "#EAECF0",
      },
    },
  },
  plugins: [],
}
