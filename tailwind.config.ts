import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-quicksand)"],
        display: ["var(--font-cinzel)"],
      },
      fontSize: {
        "2xs": "0.625rem", // 10px
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontWeight: {
        normal: '400', // Normal weight
        bold: '700', // Bold weight
        // Add more weights as needed
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
} satisfies Config;
