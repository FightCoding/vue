import Layout from '@/components/Layout/index.vue';
export default {
    path: '/organization',
    name: 'organization',
    meta: {
        title: '组织机构',
    },
    component: Layout,
    redirect: '/organization/staff',
    children: [{
        path: 'staff',
        name: 'organization/staff',
        meta: {
            title: '安全监督网人员信息',
        },
        component: () => import('@/views/organization/index.vue'),
    }, {
        path: 'statistics',
        name: 'organization/statistics',
        meta: {
            title: '安全监察网统计表',
        },
        component: () => import('@/views/organization/index.vue'),
    }]
};
