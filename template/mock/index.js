/**
 * @router
 * @author  stylehuan
 * @create  2016-12-14 09:49
 */
var proxy = require("express-http-proxy");
var interFace = require("../src/config/interfaces");
var CONFIG = {
  isProxy: false,
  main: ""
};
var mockData = require("./mock");


var apiProxy = function () {
  if (CONFIG.isProxy) {
    return proxy(CONFIG.main, {
      proxyReqPathResolver: function (req) {

        return req.originalUrl;

        // return new Promise(function (resolve, reject) {
        //   setTimeout(function () {
        //     resolve(req.originalUrl);
        //   }, 7000);
        // })
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
  for (var key in interFace) {
    app.use(interFace[key], apiProxy);
  }
};
