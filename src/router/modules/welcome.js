import Layout from '@/components/Layout/index.vue';
export default {
    path: '/welcome',
    name: 'welcome',
    meta: {
        title: '首页',
    },
    component: Layout,
    redirect: '/welcome/index',
    children: [{
        path: 'index',
        name: 'welcome/index',
        meta: {
            title: '首页',
        },
        component: () => import('@/views/welcome/index.vue'),
    }]
};
