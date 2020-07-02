import Vue from 'vue';
import 'normalize.css/normalize.css'; // A modern alternative to CSS resets
import 'animate.css'; // 引入动画库
import ElementUI from 'element-ui';
import '@/styles/index.less';
// @ts-ignore
import locale from 'element-ui/lib/locale/lang/zh-CN'; // lang i18n
import App from './App.vue';
import router from './router';
import config from './config';
import store from './store';
import { sync } from 'vuex-router-sync';
import * as filters from './utils/filters'; // global filters
window.ElementUI = ElementUI;
// 全局修改默认配置
// @ts-ignore
ElementUI.Dialog.props.closeOnClickModal.default = false;
// @ts-ignore
ElementUI.Dialog.props.closeOnPressEscape.default = false;

// set ElementUI lang to EN
Vue.use(ElementUI, { locale });
Vue.prototype.asstConfig = config;

// register global utility filters
Object.keys(filters).forEach((key) => {
  // @ts-ignore
  Vue.filter(key, filters[key]);
});

sync(store, router); // done. Returns an unsync callback fn
Vue.config.productionTip = false;

const app = new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');

if (process.env.NODE_ENV === 'development') {
  window.app = app;
}

// 异常捕获
window.addEventListener('error', (e) => {
  try {
      const error = {
          lineno: e.lineno,
          colno: e.colno,
          stack: e.error.stack,
          message: e.error.message,
      };
  } catch (e) {
      console.log('g-error', e);
  }
});
