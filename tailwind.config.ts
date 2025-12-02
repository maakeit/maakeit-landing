import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Beige + Brown Aesthetic Palette
        brown: {
          50: "#FAF7F4",
          100: "#F5EFE7",  // Warm beige background
          200: "#E8DED2",
          300: "#D4C4B4",
          400: "#B89B74",
          500: "#6D5A4C",  // Soft brown text
          600: "#5A4634",  // Button brown (primary)
          700: "#4A392A",  // Headline brown
          800: "#3D2E22",
          900: "#2D1F13",
          950: "#1A1209",
        },
        // Warm cream/beige palette
        cream: {
          50: "#FEFDFB",
          100: "#F5EFE7",  // Warm beige (matches background)
          200: "#F8F1E6",
          300: "#F2E6D4",
          400: "#E8D5BB",
          500: "#D9C1A0",
        },
        // Accent - gold
        gold: {
          400: "#D4B896",
          500: "#C7A689",  // Gold accent
          600: "#B8956E",
        },
        // Keep amber for backward compatibility
        amber: {
          400: "#C7A689",
          500: "#B89B74",
          600: "#A08260",
        },
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        'warm-sm': '0 1px 3px 0 rgba(93, 68, 39, 0.08), 0 1px 2px 0 rgba(93, 68, 39, 0.04)',
        'warm-md': '0 4px 12px -1px rgba(93, 68, 39, 0.1), 0 2px 6px -1px rgba(93, 68, 39, 0.06)',
        'warm-lg': '0 12px 24px -4px rgba(93, 68, 39, 0.12), 0 4px 8px -2px rgba(93, 68, 39, 0.06)',
        'warm-xl': '0 20px 40px -8px rgba(93, 68, 39, 0.16), 0 8px 16px -4px rgba(93, 68, 39, 0.08)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['DM Serif Display', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
