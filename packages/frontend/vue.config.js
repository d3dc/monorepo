const webpack = require('webpack');
const isProd = process.env.NODE_ENV === "production";

module.exports = {
  // modify the location of the generated HTML file.
  indexPath: 'index.html',
  outputDir: './build',

  configureWebpack: {
    // Set up all the aliases we use in our app.
    plugins: [
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 6
      })
    ]
  },

  pwa: {
    name: 'Roth Monorepo Dashboard',
    themeColor: '#172b4d',
    msTileColor: '#172b4d',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: '#172b4d'
  },
  
  css: {
    // Enable CSS source maps.
    sourceMap: process.env.NODE_ENV !== 'production'
  }
};
