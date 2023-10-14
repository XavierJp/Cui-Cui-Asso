const sass = require("sass");
const MarkdownIt = require("markdown-it");

// https://www.npmjs.com/package/markdown-it
const md = new MarkdownIt({
  html: true,
  linkify: true,
});

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

  eleventyConfig.addFilter("filterMenu", (blocks) => {
    return blocks.filter((b) => !!b.menuTitle);
  });

  eleventyConfig.addFilter("defaultStr", function (str) {
    return str || "";
  });

  eleventyConfig.addShortcode("markdown", (str) => {
    return md.render(str);
  });

  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/font");
  eleventyConfig.addPassthroughCopy("src/images");
  eleventyConfig.addPassthroughCopy("src/js");

  return {
    dir: { input: "src", output: "_site" },
  };
};
