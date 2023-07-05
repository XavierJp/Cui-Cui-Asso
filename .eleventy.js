const sass = require("sass");

module.exports = function (eleventyConfig) {
  eleventyConfig.addTemplateFormats("scss");

  // Creates the extension for use
  eleventyConfig.addExtension("scss", {
    outputFileExtension: "css",

    compile: async function (inputContent) {
      let result = sass.compileString(inputContent);

      // This is the render function, `data` is the full data cascade
      return async (data) => {
        return result.css;
      };
    },
  });

  eleventyConfig.addShortcode("year", function () {
    const d = new Date();
    return d.getFullYear();
  });

  eleventyConfig.addShortcode("life", function () {
    const livingThings = [
      "🍏",
      "🐽",
      "🐔",
      "🐸",
      "🦑",
      "🦐",
      "🦀",
      "🪰",
      "🐜",
      "🐞",
      "🐌",
      "🦋",
      "🐝",
    ];

    const index = Math.floor(Math.random() * livingThings.length);
    return livingThings[index];
  });

  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/font");
  eleventyConfig.addPassthroughCopy("src/images");

  return {
    dir: { input: "src", output: "_site" },
  };
};
