const purgecss = require("@fullhuman/postcss-purgecss");

module.exports = {
  plugins: [
    require("tailwindcss"),
    require("autoprefixer"),
    // purgecss({
    //   content: ["./js/**/*.ts", "./layouts/**/*.html", "index.html"],
    //   defaultExtractor: (content) =>
    //     content.match(/[^<>"'`\s]*[^<>"'`\s:]/g) || [],
    // }),
    // require("cssnano")({
    //   preset: "default",
    // }),
  ],
};
