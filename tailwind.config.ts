import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";


export default {
  darkMode: ["class"],
  content: ["./src/**/*.tsx"],
  safelist: ["latte", "frappe", "macchiato", "mocha"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", ...fontFamily.sans],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("@catppuccin/tailwindcss")({
      prefix: false,
      defaultFlavour: "latte",
    }),
  ],
} satisfies Config;
