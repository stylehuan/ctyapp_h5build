/**
 * @mutual
 * @author  CTWLPC
 * @create  2018-02-28 09:21
 */

import Vue from 'vue';
import urlDefine from '../config/urlDefine';
import snail from '@ta/snail-ui';

Vue.use(snail);

const alert = Vue.prototype.$modal;
const prompt = Vue.prototype.$prompt;
const toast = Vue.$Snail.toast;
const dev = snail.device;
const bus = snail.bus;

console.log(snail);
export default {
  betterModal(options) {
    alert({
      content: options.content,
      showConfirmButton: false,
      customClass: 'act-dialog act-better-dialog',
      showClose: false,
      header: false,
      footer: false
    });
  },
  systemError() {
    this.betterModal({
      content: '<h3 class="action_tips">系统异常</h3>'
    });
  },
  actNoDuring() {
    this.betterModal({
      content: '<h3 class="action_tips">财神聚宝活动不在有效期内</h3>'
    });
  },
  noLogin() {
    this.betterModal({
      content: '<h3 class="action_tips">请登录后再进行尝试</h3>'
    });
  },
  budgetLack() {
    this.betterModal({
      content: '<h3 class="action_tips">聚宝盆正在修理中</h3><p class="weak_tips">稍后再进行尝试吧</p>'
    });
  },
  toast(msg) {
    toast({
      text: msg
    });
  },
  /*
  * 银子不足
  * */
  sliverLack() {
    const self = this;

    alert({
      customClass: 'act-dialog act-weak-dialog',
      content: '<div class="g-flex g-flex-horizontal-vertical">' +
      '<div class="sorry-icon"></div>' +
      '<div><h3 class="action_tips">银子不够哎...</h3><p class="weak_tips text-align-left">不能再祈福了</p></div></div>',
      title: '',
      showClose: false,
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: '买银子',
      cancelButtonText: '算了',
      onOk() {
        self.goPayCentre();
      }
    });
  },
  showModal(options) {
    alert({
      customClass: 'act-dialog act-weak-dialog',
      content: options.content,
      title: '',
      showClose: false,
      showConfirmButton: true,
      confirmButtonText: options.confirmButtonText || '确定',
      onOk: options.onOk
    });
  },
  /*
  * 银子上限
  * */
  sliverUpperLimit() {
    this.showModal({
      content: '<h3 class="action_tips">今日银子使用已达上限</h3><p class="weak_tips">细水长流，明天再来吧！</p>',
      confirmButtonText: '知道了'
    });
  },
  needPw(onOkBack, onCancel) {
    prompt({
      customClass: 'act-dialog act-weak-dialog',
      title: '',
      msg: '请输入保护密码',
      type: 'password',
      min: 8,
      max: 16,
      placeholder: '请输入保护密码',
      showConfirmButton: true,
      showClose: false,
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      showCancelButton: true,
      onOk(val) {
        const isLegal = /\d{8,16}$/.test(val);

        if (!isLegal) {
          toast({
            text: '保护密码输入有误'
          });
          return false;
        }
        onOkBack && onOkBack(val);
        return true;
      },
      onCancel() {
        onCancel && onCancel('');
      }
    });
  },
  gainAffirm(level, sliver) {
    snail.data.gainMask = true;
    window.doSomething = (contxt) => {
      snail.data.gainMask = !snail.data.gainMask;
      contxt.className = snail.data.gainMask ? 'checkBox checkBoxed' : 'checkBox';
    };
    return new Promise(function(resolve, reject) {
      alert({
        content: '<div class="sliver-icon sliver-icon-' + level + '"></div>' +
        '<h3 class="action_tips">是否领取' + sliver + '两银子？</h3>' +
        '<p class="gainAwardTips">一旦领取财宝，聚宝盆会清空，可重新<br/>开始祈福聚宝</p>' +
        '<div class="checkBox checkBoxed" onclick="doSomething(this)"><i></i><span class="weak_tips">不再提示</span></div>',
        customClass: 'act-dialog act-weak-dialog',
        title: '',
        showConfirmButton: true,
        showCancelButton: true,
        showClose: false,
        cancelButtonText: '确定领取',
        confirmButtonText: '我再想想',
        onCancel() {
          resolve();
        },
        onOk() {
          return true;
        }
      });
    });
  },
  showAward(level, sliver) {
    alert({
      content: '<div class="award-title"></div>' +
      '<div class="sliver-icon sliver-icon-' + level + '"></div>' +
      '<h3 class="action_tips">' + sliver + '两银子</h3>' +
      '<p class="weak_tips">银子将于24小时内发放至您的保险箱中</p>',
      customClass: 'act-dialog act-weak-dialog',
      title: '',
      showClose: false,
      showConfirmButton: true,
      confirmButtonText: '知道了',
      onOk() {
        bus.emit('change');
      }
    });
  },
  goPayCentre() {
    if (dev.isIos) {
      toast('请到游戏内获取银子');
      return;
    }
    window.location.href = urlDefine.pay + '?return=' + encodeURIComponent(window.location.href);
  }
};
