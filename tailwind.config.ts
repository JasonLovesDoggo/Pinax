import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

import { createThemes } from "tw-colors";

export default {
  darkMode: ["class"],
  content: ["./src/**/*.tsx"],
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
    createThemes(({ light, dark }) => ({
      'winter': light({
        'primary': 'steelblue',
        'base': 'darkblue',
        'surface': '#F3F3F3',
      }),
      'forest': dark({
        'primary': 'turquoise',
        'base': 'tomato',
        'surface': '#4A4A4A',
      }),
    }))
  ],
} satisfies Config;
