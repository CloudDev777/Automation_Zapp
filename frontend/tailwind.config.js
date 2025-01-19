import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  plugins: [daisyui, require("tailwindcss-animate")],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#8c54da",
          "primary-content": "#e6defa",
          secondary: "#d2ae38",
          "secondary-content": "#100b01",
          accent: "#6fdf82",
          "accent-content": "#041206",
          neutral: "#262931",
          "neutral-content": "#cfd0d2",
          "base-100": "#f5ecef",
          "base-200": "#d5cdd0",
          "base-300": "#b6afb1",
          "base-content": "#151314",
          info: "#2563EB",
          "info-content": "#d2e2ff",
          success: "#16A34A",
          "success-content": "#000a02",
          warning: "#D97706",
          "warning-content": "#110500",
          error: "#DC2626",
          "error-content": "#ffd9d4",
        },
      },
    ],
  },
};
