import 'babel-polyfill';
import Vue from 'vue';
import App from './App';
import fastclick from 'fastclick';
import config from './config/config';
{{#router}}
import VueRouter from 'vue-router';
import router from './router/routerInstance';
Vue.use(VueRouter);
{{/router}}
import Snail from '@ta/snail-ui';
import '@ta/snail-ui/dist/styles/snail.css';

const main = {
  step() {
    fastclick.attach(document.body);

    if (config.preload.isNeed) {
      this.preload();
    } else {
      this.init();
    }

    Vue.config.errorHandler = config.errorHandler || function (err, vm) {
      console.log('----------------', err);
    };
    this.init();
  },
  //预加载配置
  preload() {
    const self = this;

    Snail.preload(config.preload.resource, function(n, t) {
      if (n === t) {
        Vue.$Snail.loading.hide();
        self.init();
      }
      Vue.$Snail.loading.show(parseInt((n / t) * 100) + '%');
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
