// .eleventy.js
module.exports = function (eleventyConfig) {

  // Pass through static assets
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });

  // Articles collection: tagged "articles", sorted newest first
  eleventyConfig.addCollection("articles", (collectionApi) => {
    return collectionApi
      .getFilteredByTag("articles")
      .sort((a, b) => b.date - a.date);
  });

  // Date filter (used in article layouts)
  eleventyConfig.addFilter("date", (value, format) => {
    const d = value instanceof Date ? value : new Date(value);
    if (format === "yyyy") return d.getFullYear().toString();
    if (format === "yyyy-MM-dd") return d.toISOString().slice(0, 10);
    if (format === "d MMM yyyy") {
      return d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
    }
    if (format === "d MMMM yyyy") {
      return d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
    }
    return d.toISOString().slice(0, 10);
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data",
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
};
