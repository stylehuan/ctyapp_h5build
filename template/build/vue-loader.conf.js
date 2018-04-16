const utils = require('./utils');
{{#rem}}
const postCssConf = require("../config/postcss");
const px2rem = require("postcss-plugin-px2rem");
{{/rem}}
module.exports = {
  loaders: utils.cssLoaders({
    sourceMap: false,
    extract: process.env.NODE_ENV !== 'dev'
  }),
  postcss: [
    require('autoprefixer')({
      browsers: ["iOS >= 7",
        "Android > 4.0"]
    }){{#rem}},
    px2rem(postCssConf){{/rem}}
  ]
};
