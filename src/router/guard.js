/*
    路由守卫
 */
import store from '../store';
import NProgress from 'nprogress'; // progress bar
import '../styles/nprogress.less'; // progress bar style

NProgress.configure({
    showSpinner: false,
});

// 绑定路由守卫
export function bindGuards(router) {
    router.beforeEach(async (to, from, next) => {
        console.log('to', to);
        NProgress.start();
    // set page title
    /*let title = '国神集团发电安全管理系统';
      if (to.meta.title) {
        title = to.meta.title;
      }
      document.title = title;*/


    // 不需要登录认证的路由可以直接放行
    /*if (to.meta && to.meta.needNotAuth) {
      return next();
    }
    // 访问路由与当前路由一致放行
    if (to.name === from.name) {
      return next();
    }
    // 检查用户态，未登录前去登录
    try {
      await store.dispatch('user/checkUser', { token: to.query.auth_token });
    } catch (e) {
      if (to.query.auth_token) {
        next({
          path: '/client/checkuser?auth_token=' + to.query.auth_token + '&preurl=' + to.fullPath,
        });
        return;
      }
      next({
        name: 'auth/login',
        replace: true,
      });
      return;
    }*/
        next();
    });
    router.afterEach((to, from) => {
        NProgress.done();
    });
}
