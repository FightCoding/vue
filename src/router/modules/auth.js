export default [
    {
        path: '/auth/login',
        name: 'auth/login',
        meta: {
            title: '登录',
            needNotAuth: true,
        },
        component: () => import('@/views/auth/Login.vue'),
    },
];
