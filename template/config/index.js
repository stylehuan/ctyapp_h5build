// see http://vuejs-templates.github.io/webpack for documentation.
const path = require('path');
const merge = require('webpack-merge')
const defaultConfig = {
  index: path.resolve(__dirname, '../dist', process.env.NODE_ENV, 'index.html'),
  // index: path.resolve(__dirname, '../dist', 'index.html'),
  assetsRoot: path.resolve(__dirname, '../dist'),
  assetsSubDirectory: 'assets',
  productionSourceMap: true,
  productionGzip: false,
  productionGzipExtensions: ['js', 'css'],
  bundleAnalyzerReport: process.env.npm_config_report
};

//assetsPublicPath: require('./prod.env').assetsPublicPath,
module.exports = {
  prod: merge(defaultConfig),
  dev: {
    port: 8080,
    autoOpenBrowser: true,
    assetsSubDirectory: '../',
    assetsPublicPath: '/',
    proxyTable: {},
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  }
};
