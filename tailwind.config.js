/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      container: {
        center: "true",
      },
      fontFamily: {
        dmSans: ["DM Sans", "sans-serif"],
      },
      borderRadius: {
        lg: "var(--vfe-radius)",
        md: "calc(var(--vfe-radius) - 2px)",
        sm: "calc(var(--vfe-radius) - 4px)",
      },
      backgroundColor: {
        "vfe-bg-primary": "var(--vfe-background-primary)",
      },
      colors: {
        brand: "#7C36D6",
        background: "hsl(var(--vfe-background))",
        foreground: "hsl(var(--vfe-foreground))",
        card: {
          DEFAULT: "hsl(var(--vfe-card))",
          foreground: "hsl(var(--vfe-card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--vfe-popover))",
          foreground: "hsl(var(--vfe-popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--vfe-primary))",
          foreground: "hsl(var(--vfe-primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--vfe-secondary))",
          foreground: "hsl(var(--vfe-secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--vfe-muted))",
          foreground: "hsl(var(--vfe-muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--vfe-accent))",
          foreground: "hsl(var(--vfe-accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--vfe-destructive))",
          foreground: "hsl(var(--vfe-destructive-foreground))",
        },
        border: "hsl(var(--vfe-border))",
        input: "hsl(var(--vfe-input))",
        ring: "hsl(var(--vfe-ring))",
        chart: {
          1: "hsl(var(--vfe-chart-1))",
          2: "hsl(var(--vfe-chart-2))",
          3: "hsl(var(--vfe-chart-3))",
          4: "hsl(var(--vfe-chart-4))",
          5: "hsl(var(--vfe-chart-5))",
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
