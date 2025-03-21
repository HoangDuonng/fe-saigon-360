import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
        colors: {
          yellow: "#B2910E",
          red: "#A5190E"
        },
        animation: {
          pulseGlow: "pulseGlow 1.5s infinite",
          wiggle: "wiggle 1.5s infinite ease-in-out",
        },
        keyframes: {
          pulseGlow: {
            "0%, 100%": { opacity: "0.5", transform: "scale(1)" },
            "50%": { opacity: "0.2", transform: "scale(1.2)" },
          },
          wiggle: {
            "0%, 100%": { transform: "rotate(0deg)" },
            "25%": { transform: "rotate(2deg)" },
            "50%": { transform: "rotate(-2deg)" },
            "75%": { transform: "rotate(2deg)" },
          },
        },
    },
  },
  plugins: [],
};
export default config;
