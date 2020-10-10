// tailwind.config.js
const { colors } = require("tailwindcss/defaultTheme");
const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  theme: {
    colors: {
      primary: {
        50: "#f2f8fb",
        100: "#e8f5fc",
        200: "#c1d8fb",
        300: "#a1c0fb",
        400: "#7b99fa",
        500: "#596ffa",
        600: "#484ef9",
        700: "#3c3ded",
        800: "#3231c1",
        900: "#252a98",
      },
      neutral: colors.gray,
      success: colors.green,
      error: colors.red,
      warning: colors.yellow,
      white: colors.white,
      transparent: colors.transparent,
    },
    container: {
      center: true,
      padding: {
        default: "1rem",
        sm: "2rem",
        lg: "4rem",
        xl: "5rem",
      },
    },
    fontFamily: {
      sans: ["Montserrat", "sans-serif"],
      serif: ["Lora", "serif"],
      mono: ["IBM Plex Mono", "monospace"],
    },
    extend: {
      gridTemplateRows: {
        layout: "auto 1fr auto",
      },
      spacing: {
        72: "18rem",
        84: "21rem",
        96: "24rem",
      },
    },
  },
  variants: {},
  plugins: [],
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
};
