const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const path = require("path");

const now = String(Date.now())

var getIndex = (collection, currentSlug) => {
  let currentIndex = 0;
  collection.filter((page, index) => {
    currentIndex = page.fileSlug == currentSlug ? index : currentIndex;
  });
  return currentIndex;
};

module.exports = function(eleventyConfig) {
  eleventyConfig.setUseGitIgnore(false)
  eleventyConfig.addWatchTarget('./_tmp/style.css')
  eleventyConfig.addPassthroughCopy({ './_tmp/style.css': './style.css' })
  eleventyConfig.addShortcode('version', function () {
    return now
  });

  // Plugins
  eleventyConfig.addPlugin(eleventyNavigationPlugin);

  // Filters
  eleventyConfig.addFilter("autoIndexNav", function(collection, currentSlug) {
    const currentIndex = getIndex(collection, currentSlug);

    collection.map((page, index) => {
      console.log(page.data.page.inputPath);
      console.log(page.data.page.outputPath);

      const key =
        path.basename(page.data.page.inputPath) === "index.md"
          ? path.basename(path.dirname(page.data.page.outputPath))
          : undefined;

      console.log(path.basename(path.dirname(page.data.page.outputPath)));
      const maybeParent = path.basename(
        path.dirname(path.dirname(page.data.page.outputPath))
      );
      const parent = maybeParent === "_site" ? "home" : maybeParent;
      console.log("maybeParent", maybeParent);
      console.log("parent", parent);

      // console.log(page);
      // if (index === currentIndex) {

      if (page.data.eleventyNavigation === undefined) {
        page.data.eleventyNavigation = {
          key: key || page.data.title,
          parent: parent,
          title: page.data.title
        };
      }

      // console.log(page.data.eleventyNavigation);
      // page.data.eleventyNavigation = {};
      // }
    });

    return collection;
  });

  return {
    markdownTemplateEngine: "njk",
    dir: {
      output: "_site"
    }
  };
};
