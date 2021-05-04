module.exports = {
  plugins: [
    "gatsby-theme-docz",
    {
      resolve: `gatsby-plugin-polyfill-io`,
      options: {
        features: ["smoothscroll"],
      },
    },
  ],
};
