module.exports = function (eleventyConfig) {
  eleventyConfig.addShortcode("year", function () {
    const d = new Date();
    return d.getFullYear();
  });

  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/font");

  return {
    dir: { input: "src", output: "_site" },
  };
};
