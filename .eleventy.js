const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");

module.exports = function(eleventyConfig) {
  eleventyConfig.addPlugin(eleventyNavigationPlugin);

  return {
    markdownTemplateEngine: "njk",
    dir: {
      output: '._site'
    }
  }
};
