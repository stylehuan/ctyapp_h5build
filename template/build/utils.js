const path = require('path');
const config = require('../config');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const glob = require('glob');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const PAGE_PATH = path.resolve(__dirname, '../src/pages');
const domains = require('../config/domain');
const __domain = domains;

exports.assetsPath = function(_path) {
  return path.posix.join(config.prod.assetsSubDirectory, _path);
};

exports.PAGE_PATH = path.resolve(__dirname, '../src/pages');

exports.cssLoaders = function(options) {
  options = options || {}

  // generate loader string to be used with extract text plugin
  function generateLoaders(loaders) {
    const sourceLoader = loaders.map(function(loader) {
      let extraParamChar;

      if (/\?/.test(loader)) {
        loader = loader.replace(/\?/, '-loader?');
        extraParamChar = '&'
      } else {
        loader = loader + '-loader'
        extraParamChar = '?'
      }
      return loader + (options.sourceMap ? extraParamChar + 'sourceMap' : '')
    }).join('!');


    //重写样式文件中的路径
    if (options.extract) {
      return ExtractTextPlugin.extract({
        use: sourceLoader,
        fallback: 'vue-style-loader',
        publicPath: '../'
      })
    } else {
      return ['vue-style-loader', sourceLoader].join('!')
    }
  }

  // http://vuejs.github.io/vue-loader/en/configurations/extract-css.html
  return {
    css: generateLoaders(['css']),
    postcss: generateLoaders(['css']),
    less: generateLoaders(['css', 'less']),
    sass: generateLoaders(['css', 'sass?indentedSyntax']),
    scss: generateLoaders(['css', 'sass']),
    stylus: generateLoaders(['css', 'stylus']),
    styl: generateLoaders(['css', 'stylus'])
  }
};

// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = function(options) {
  const output = []
  const loaders = exports.cssLoaders(options)
  for (const extension in loaders) {
    const loader = loaders[extension]
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      loader: loader
    })
  }
  return output
};

//多入口配置
// 通过glob模块读取pages文件夹下的所有对应文件夹下的js后缀文件，如果该文件存在
// 那么就作为入口处理
exports.entries = function() {
  const entryFiles = glob.sync(PAGE_PATH + '/*/*.js');
  const map = {};
  entryFiles.forEach((filePath) => {
    const filename = filePath.substring(filePath.lastIndexOf('\/') + 1, filePath.lastIndexOf('.'));
    map[filename] = filePath
  });
  return map;
};

//多页面输出配置
//与上面的多页面入口配置相同，读取pages文件夹下的对应的html后缀文件，然后放入数组中
exports.htmlPlugin = function() {
  let entryHtml = glob.sync(PAGE_PATH + '/*/*.html');
  let arr = [];
  entryHtml.forEach((filePath) => {
    let filename = filePath.substring(filePath.lastIndexOf('\/') + 1, filePath.lastIndexOf('.'))
    let conf = {
      // 模板来源
      template: filePath,
      // 文件名称
      filename: filename + '.html',
      // 页面模板需要加对应的js脚本，如果不加这行则每个页面都会引入所有的js脚本
      chunks: ['manifest', 'vendor', filename],
      inject: true,
      env: 'dev',
      domains: JSON.stringify(__domain['dev'])
    };
    arr.push(new HtmlWebpackPlugin(conf));
  });
  return arr;
};
