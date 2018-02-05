import 'babel-polyfill';
import Vue from 'vue';
import App from './App';
import fastclick from 'fastclick';
import config from './config/config';
import Topi from 'Topi';
{{#router}}
import VueRouter from 'vue-router';
import router from './router/routerInstance';
Vue.use(VueRouter);
{{/router}}


let main = {
  step() {
    fastclick.attach(document.body);

    //加载当前活动配置
    Topi.loadConfig(config);

    Vue.config.errorHandler = config.errorHandler || function (err, vm) {
      console.log('----------------', err);
    };
    this.init();
  },
  //预加载配置
  preload() {
    let self = this;
    let preload = require.ensure(['./util/preload'], function (require, preload) {
      Vue.$bee.loading.show("资源加载中");
      preload(config.preload.resource, () => {
        if (n === t) {
          Vue.$bee.loading.hide();
          self.init();
        }
        Vue.$bee.loading.show(parseInt((n / t) * 100) + "%");
      });
    });
  },
  init() {
    new Vue({
    {{#store}}
      store,
        {{/store}}
    {{#router}}
      router,
        {{/router}}
      template: '<App/>',
      components: {App}
    }).$mount('#app');
  }
};
main.step();
