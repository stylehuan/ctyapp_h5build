const path = require('path');
const utils = require('./utils');
const webpack = require('webpack');
const config = require('../config');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackAssetPrefix = require('./html-webpack-html-asset-prefix');
const FileManagerPlugin = require('filemanager-webpack-plugin');
const domains = require('../config/domain');
const glob = require('glob');
const __domain = domains;
const htmlTemplate = (function() {
  const arr = [];

  for (const i in __domain) {
    //排除生成本地开发
    if (__domain.hasOwnProperty(i) && i !== 'dev') {
      const entryHtml = glob.sync(utils.PAGE_PATH + '/*/*.html');

      entryHtml.forEach(filePath => {
        const filename = filePath.substring(filePath.lastIndexOf('\/') + 1, filePath.lastIndexOf('.'));
        const conf = {
          // 模板来源
          template: filePath,
          // 文件名称,
          filename: path.resolve(__dirname, '../dist', i, filename + '.html'),
          // 页面模板需要加对应的js脚本，如果不加这行则每个页面都会引入所有的js脚本
          chunks: ['manifest', 'vendor', filename],
          inject: true,
          env: i,
          domains: JSON.stringify(__domain[i]),
          minify: {
            removeComments: true,
            minifyJS: true,
            collapseWhitespace: true,
            removeAttributeQuotes: true
          },
          chunksSortMode: 'dependency'
        };

        arr.push(new HtmlWebpackPlugin(conf));
      });
    }
  }
  return arr;
})();
const webpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({
      sourceMap: false,
      extract: true
    })
  },
  devtool: false,
  output: {
    filename: utils.assetsPath('js/[name].[chunkhash].js'),
    chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    // extract css into its own file
    new ExtractTextPlugin({
      filename: utils.assetsPath('css/[name].[contenthash].css'),
      allChunks: true
    }),
    new HtmlWebpackAssetPrefix(function(assets, env) {
      return __domain[env].projectPath + assets.replace('../', '');
    }),
    // generate dist index.html with correct asset hash for caching.
    // you can customize output by editing /index.html
    // see https://github.com/ampedandwired/html-webpack-plugin
// split vendor js into its own file
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function(module, count) {
        // any required modules inside node_modules are extracted to vendor
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(
            path.join(__dirname, '../node_modules')
          ) === 0
        )
      }
    }),
    // extract webpack runtime and module manifest to its own file in order to
    // prevent vendor hash from being updated whenever app bundle is updated
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      chunks: ['vendor']
    }),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: 'assets'
      }
    ]),
    new FileManagerPlugin({
      onEnd: {
        delete: [
          './dist/assets/headers.js'
        ],
        move: [{source: './dist/images', destination: './dist/assets/images'}]
      }
    })
  ].concat(htmlTemplate)
});

if (config[process.env.NODE_ENV].productionGzip) {
  const CompressionWebpackPlugin = require('compression-webpack-plugin');
  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' +
        config[env].productionGzipExtensions.join('|') +
        ')$'
      ),
      threshold: 10240,
      minRatio: 0.8
    })
  )
}
if (config[process.env.NODE_ENV].bundleAnalyzerReport) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

  webpackConfig.plugins.push(new BundleAnalyzerPlugin());
}
module.exports = webpackConfig;
