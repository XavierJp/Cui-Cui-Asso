const path = require("node:path");
const sass = require("sass");
const MarkdownIt = require("markdown-it");
const crypto = require("crypto");

// https://www.npmjs.com/package/markdown-it
const md = new MarkdownIt({
  html: true,
  linkify: true,
});

// Asset manifest to track hashed filenames
const assetManifest = {};

module.exports = function (eleventyConfig) {
  eleventyConfig.addTemplateFormats("scss");

  // Creates the extension for use
  eleventyConfig.addExtension("scss", {
    outputFileExtension: "css",
    compile: async function (inputContent, inputPath) {
      let parsed = path.parse(inputPath);

			let result = sass.compileString(inputContent, {
				loadPaths: [
					parsed.dir || ".",
					this.config.dir.includes,
				],
				style: "compressed" // Minify the CSS
			});

      // This is the render function, `data` is the full data cascade
      return async (data) => {
        return result.css;
      };
    },
    compileOptions: {
      permalink: function(_contents, inputPath) {
        const parsed = path.parse(inputPath);

        // compile option run before compile. We cannot hash it. Lets use a random id.
        const random = crypto.randomUUID().slice(0,6);

        const originalPath = `/css/${parsed.name}.css`;
        const hashedPath = `/css/${parsed.name}.${random}.css`;

        // Store in manifest
        assetManifest[originalPath] = hashedPath;
        return hashedPath;
      }
    }
  });

  // Add rev filter for asset hashing
  eleventyConfig.addFilter("rev", function(url) {
    return assetManifest[url] || url;
  });

  eleventyConfig.addShortcode("year", function () {
    const d = new Date();
    return d.getFullYear();
  });

  eleventyConfig.addFilter("defaultStr", function (str) {
    return str || "";
  });

  eleventyConfig.addShortcode("markdown", (str) => {
    return md.render(str);
  });

  // French date formatting filter
  eleventyConfig.addFilter("frenchDate", function(dateString) {
    const date = new Date(dateString);
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    return date.toLocaleDateString('fr-FR', options);
  });


  eleventyConfig.addPassthroughCopy("src/font");
  eleventyConfig.addPassthroughCopy("src/images");
  eleventyConfig.addPassthroughCopy("src/js");

  return {
    dir: { input: "src", output: "_site" },
  };
};
