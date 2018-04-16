/**
 * @html-webpack-html-asset-prefix
 * @author  CTWLPC
 * @create  2018-04-11 13:57
 */
function HtmlWebpackAssetPrefixPlugin(func) {
  this.options = func;
}

HtmlWebpackAssetPrefixPlugin.prototype.apply = function(compiler) {
  var self = this;
  compiler.plugin('compilation', function(compilation, options) {
    compilation.plugin('html-webpack-plugin-before-html-processing', function(htmlPluginData, callback) {
      var assets = htmlPluginData.assets;
      var plugin = htmlPluginData.plugin;
      var jsLen = assets.js.length;
      var cssLen = assets.css.length;
      // assets.publicPath = path;
      var len = jsLen > cssLen ? jsLen : cssLen;

      for (var i = 0; i < len; i++) {
        if (assets.js[i]) {
          assets.js[i] = self.options(assets.js[i], plugin.options.env);
        }
        if (assets.css[i]) {
          assets.css[i] = self.options(assets.css[i], plugin.options.env);
        }
      }

      // htmlPluginData.assets = JSON.stringify(assetsObj);
      callback(null, htmlPluginData);
    });
  });
};

module.exports = HtmlWebpackAssetPrefixPlugin;
