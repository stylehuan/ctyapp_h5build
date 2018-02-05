// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path');
var merge = require('webpack-merge')
let defaultConfig = {
  index: path.resolve(__dirname,'../dist',process.env.NODE_ENV,'index.html'),
  assetsRoot: path.resolve(__dirname, '../dist', process.env.NODE_ENV),
  assetsSubDirectory: '',
  productionSourceMap: true,
  productionGzip: false,
  productionGzipExtensions: ['js', 'css'],
  bundleAnalyzerReport: process.env.npm_config_report
}
//assetsPublicPath: require('./prod.env').assetsPublicPath,
module.exports = {
  prod: merge(defaultConfig, {
    domain: require('./prod.env').DOMAIN,
    assetsPublicPath: require('./prod.env').assetsPublicPath
  }),
  1505: merge(defaultConfig, {
    domain: require('./1505.env').DOMAIN,
    assetsPublicPath: require('./1505.env').assetsPublicPath
  }),
  1506: merge(defaultConfig, {
    domain: require('./1506.env').DOMAIN,
    assetsPublicPath: require('./1506.env').assetsPublicPath
  }),
  1507: merge(defaultConfig, {
    domain: require('./1507.env').DOMAIN,
    assetsPublicPath: require('./1507.env').assetsPublicPath
  }),
  2505: merge(defaultConfig, {
    domain: require('./2505.env').DOMAIN,
    assetsPublicPath: require('./2505.env').assetsPublicPath
  }),
  dev: {
    domain: require('./dev.env').DOMAIN,
    port: 8080,
    autoOpenBrowser: true,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {},
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  }
}
