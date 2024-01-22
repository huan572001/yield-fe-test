/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        "3xl":
          "0px 9px 28px 8px rgba(0, 0, 0, 0.05), 0px 3px 6px -4px rgba(0, 0, 0, 0.12), 0px 6px 16px 0px rgba(0, 0, 0, 0.08)",
      },
    },
    colors: {
      pageBackground: "#F2F2F0",
      tealGreenColor: "#49BCA0",
      white: "#fff",
      black: {
        10: "#000",
        100: "#131722",
      },
      red: {
        520: "#FF4D4F33",
      },
      gray: {
        100: "#898787",
        200: "#F1F0EE",
        300: "#E2DEDE",
        400: "#817F7F",
        500: "#B8B8B7",
        600: "#F2F4F6FF",
      },
      lightGrayishBlue: "#E2E8F0",
      deepGreen: {
        100: "#23936A",
        200: "#00A83E",
        500: "#23936A",
      },
      neutral: {
        100: "#D0D5DD",
        700: "#3D3D3D",
      },
      indigo: {
        400: "#6450FF",
        500: "#655CFF",
        600: "#4f46e5",
      },
      cyan: {
        600: "#0891b2",
      },
      sky: {
        600: "#0284c7",
      },
      zinc: {
        500: "#71717a",
      },
      blue: {
        200: "#E0DEFF",
        500: "#655CFF",
        600: "#2563eb",
        700: "#1d4ed8",
        800: "#1677FF",
      },
      violet: {
        400: "#a78bfa",
        500: "#8b5cf6",
      },
      primaryRed: "#FF3A33",
      midnightBlue: "#334155",
      lightBlue: "#CBD5E1",
      paleGreen: "#A9E1BE",
      midnightNavy: "#0F172A",
      steelBlue: "#64748B",
      paleSilver: "#EFF2F5",
      lightBlueGrey: "#F1F5F9",
      primary: {
        50: "#F5F5F5",
        100: "#EAEAEA",
        300: "#D6D6D6",
        400: "#8B8B8B",
        450: "#646464",
        500: "#3D3D3D",
        600: "#5B53E6",
      },
      primaryPurple: {
        200: "#E0DEFF",
        300: "#A39DFF",
        500: "#655CFF",
        600: "#5B53E6",
      },
      error: {
        25: "#FFFBFA",
        200: "#FECDCA",
        500: "#F04438",
      },
      overlay: {
        20: "#655CFF33",
      },
      neutralGray: {
        50: "#F9FAFB",
        200: "#EAECF0",
        400: "#98A2B3",
        500: "#667085",
        600: "#475467",
        700: "#344054",
      },
      yellow: {
        50: "#FFF7E6",
      },
      amber: {
        200: "#FFD591",
        600: "#D46B08",
      },
    },

    fontFamily: {
      sans: ['"Inter"'],
      poppins: ['"Poppins"'],
    },
  },
  plugins: [],
};
