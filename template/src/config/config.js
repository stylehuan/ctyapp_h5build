/**
 * @config
 * @author  CTWLPC
 * @create  2018-02-05 20:17
 */
import snail from '@ta/snail-ui';
import appInterface from '@ta/appinterface';
import env from './env';
import Vue from 'vue';

Vue.use(appInterface);
Vue.use(snail);

const toast = snail.toast;
const CODE = {
  //网络异常
  '555'() {
    toast('网络异常');
  },
  '666'() {
    toast('网络超时，请重试');
  }
};

const CONFIG = {
  dialogSkin: 'act_dialog',
  getHeaderInfo() {
    if (env.isLocal) {
      return window.Mock && window.Mock.misar001;
    }
    return Vue.$Snail.appInterface.getHeaderInfo();
  },
  //初始化预加载配置
  preload: {
    isNeed: true,
    resource: [
      // require('../assets/images/bgm.mp3')
    ]
  },
  net: {
    isNeedIntercept: true, //是否需要拦截器
    MAX_WAIT_TIME: 6000, //接口最大响应等待时间
    preRequest(config) {
      return config;
    },
    preResponse(response) {
      const res = response.data;
      const code = res.Code;

      if (CODE[code]) {
        Vue.nextTick(() => {
          CODE[code]();
        });
        return null;
      }
      return response;
    }
  }
};

export default CONFIG;
