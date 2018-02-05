var utils = require('./utils')
var config = require('../config')
var postCssConf = require("../config/postcss");
var px2rem = require("postcss-plugin-px2rem");
module.exports = {
  loaders: utils.cssLoaders({
    sourceMap: false,
    extract: process.env.NODE_ENV !== 'dev'
  }),
  postcss: [
    require('autoprefixer')(),
    px2rem(postCssConf)
  ]
};
