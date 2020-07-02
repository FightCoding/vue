/*
    路由管理器
    path: 路由url required
    name: 路由唯一标识 required
    route.meta 特殊字段说明
    {
        title: 标题 required
        hideNavBar: 隐藏导航栏
        needNotAuth: 不需要登录认证也可访问
    }
 */
import Vue from 'vue';
import VueRouter from 'vue-router';
import {bindGuards} from './guard';
import Layout from '../components/Layout/index.vue';
import auth from './modules/auth';
import welcome from './modules/welcome';
import organization from './modules/organization';

Vue.use(VueRouter);

export const permissionRoutes = [
    welcome,
    organization,
];

const routes = [
    ...auth,
    ...permissionRoutes,
    {
        path: '*',
        component: () => import('@/views/404.vue'),
    },
];

const router = new VueRouter({
    mode: 'history',
    routes,
});
bindGuards(router);
export default router;
