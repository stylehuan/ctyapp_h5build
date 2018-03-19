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
import '@ta/snail-ui/dist/styles/snail.css';


let main = {
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
