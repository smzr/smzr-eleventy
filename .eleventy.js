const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const { DateTime } = require("luxon");

// Utils 
const sortByDisplayOrder = require('./src/utils/sort-by-display-order.js');

// Transforms
const htmlMinTransform = require('./src/transforms/html-min-transform.js');

// Create a helpful production flag
const isProduction = process.env.NODE_ENV === 'production';

module.exports = config => {
  // Only minify HTML if we are in production
  if (isProduction) {
    config.addTransform('htmlmin', htmlMinTransform);
  }

  // Passthroughs
  config.addPassthroughCopy('src/admin/config.yml');

  // Plugins
  config.addPlugin(syntaxHighlight);

  // Filters
  config.addFilter("shortDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj).toFormat('MMM dd');
  });
  config.addFilter("fullDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj).toFormat('MMMM dd, yyyy');
  });
  config.addFilter("w3Date", (dateObj) => {
    return DateTime.fromJSDate(dateObj).toISO();
  });

  // Returns project items, sorted by display order
  config.addCollection('projects', collection => {
    return sortByDisplayOrder(collection.getFilteredByGlob('./src/projects/*.md'));
  });

  config.addCollection("postsByYear", collection => {
    const posts = collection.getFilteredByGlob('./src/blog/*.md').reverse();
    const years = posts.map(post => post.date.getFullYear());
    const uniqueYears = [...new Set(years)];
  
    const postsByYear = uniqueYears.reduce((prev, year) => {
      const filteredPosts = posts.filter(post => post.date.getFullYear() === year);
  
      return [
        ...prev,
        [year, filteredPosts]
      ]
    }, []);
  
    return postsByYear;
  });

  // Tell 11ty to use the .eleventyignore and ignore our .gitignore file
  config.setUseGitIgnore(false);

  return {
    markdownTemplateEngine: 'njk',
    dataTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
    dir: {
      input: 'src',
      output: 'dist'
    }
  };
};
