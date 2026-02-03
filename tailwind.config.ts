import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "var(--color-bg)",
        surface: "var(--color-surface)",
        primary: "var(--color-primary)",
        "primary-hover": "var(--color-primary-hover)",
        text: "var(--color-text)",
        muted: "var(--color-muted)",
      },
      width: {
        sidebar: "var(--sidebar-width)",
      },
      height: {
        header: "var(--header-height)",
      },
      borderRadius: {
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
      },
    },
  },
  plugins: [],
};

export default config;
