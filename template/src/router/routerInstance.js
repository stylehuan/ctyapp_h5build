import VueRouter from 'vue-router';
import routerConf from './router';
const routes = [
  {
    path: routerConf.root,
    component(resolve) {
      // require(['components/active1'], resolve)
    }
  }
];
const router = new VueRouter({
  // mode: 'history',//IOS低版本要开启history模式
  routes,
  transitionOnLoad: false
});

router.beforeEach((to, from, next) => {
  setTimeout(next, 200);
});
router.afterEach(() => {
  console.log('完成');
});
export default router;
