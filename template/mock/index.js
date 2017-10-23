/**
 * @router
 * @author  stylehuan
 * @create  2016-12-14 09:49
 */
var proxy = require("express-http-proxy");
var interFace = require("../src/define/interfaces");
var CONFIG = {
  isProxy: false,
  main: "http://mobilecardgame.tcy365.org:1505"
};
var mockData = require("./mock");


var apiProxy = function () {
  if (CONFIG.isProxy) {
    return proxy(CONFIG.main, {
      forwardPath: function (req, res) {
        return req._parsedUrl.path
      }
    });
  }
  return function (req, res, next) {
    if (req.baseUrl) {
      res.json(mockData[req.baseUrl]);
    } else {
      res.json({
        "msg": "nodata"
      });
    }
  };
}();


module.exports = function (app) {
  //模拟数据
  var keys = interFace.keys();  //遍历Key
  for (var key of keys) {
    app.use(key, apiProxy);
  }
};
