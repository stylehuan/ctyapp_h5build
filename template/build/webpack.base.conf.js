var path = require('path')
var utils = require('./utils')
var webpack = require('webpack')
var config = require('../config')
var vueLoaderConfig = require('./vue-loader.conf')

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

let webpackConfig = {
  entry: {
    app: './src/main.js'
  },
  output: {
    path: config[process.env.NODE_ENV].assetsRoot,
    filename: '[name].js',
    publicPath: config[process.env.NODE_ENV].assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    modules: [
      resolve('src'),
      resolve('node_modules')
    ],
    alias: {
      'vue$': 'vue/dist/vue.common.js',
      'src$': resolve('src'),
      'assets$': resolve('src/assets'),
      'components$': resolve('src/components'),
      'util$': resolve('src/util'),
      'define$': resolve('src/define'),
      'view$': resolve('src/view')
    }
  },
  externals: {
    'vue': 'window.Vue',
    'vue-router': 'window.VueRouter',
    'vuex': 'window.Vuex',
    'moment': 'window.moment',
    'fastclick': 'window.FastClick',
    'fundebug': 'window.fundebug'
  },
  module: {
    rules: [
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: "pre",
        include: [resolve('src'), resolve('test')],
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src')],
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: [{
          loader: 'url-loader',
          query: {
            limit: 10000,
            name: utils.assetsPath('images/[name].[hash:7].[ext]')
          }
        },
          {
            loader: 'img-loader',
            options: {
              enabled: process.env.NODE_ENV === 'prod',
              gifsicle: {
                interlaced: false
              },
              mozjpeg: {
                progressive: true,
                arithmetic: false
              },
              optipng: false, // disabled
              pngquant: {
                floyd: 0.5,
                speed: 2
              },
              svgo: {
                plugins: [
                  {removeTitle: true},
                  {convertPathData: false}
                ]
              }
            }
          }
        ]
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp3|mp4)(\?.*)?$/,
        loader: 'file-loader',
        query: {
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  plugins: [new webpack.DefinePlugin({
    __domain: JSON.stringify(config[process.env.NODE_ENV].domain),
    _ENV: {
      isLocal: process.env.NODE_ENV === 'dev',
      isTest: process.env.NODE_ENV === '1505' || process.env.NODE_ENV === '1506' || process.env.NODE_ENV === '1507',
      isPre: process.env.NODE_ENV === '2505'
    }
  }),]
};

module.exports = webpackConfig;
