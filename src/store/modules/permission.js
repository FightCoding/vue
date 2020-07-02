// 用户权限
import person, { routes } from '@/router';

export default {
    namespaced: true,
    state: {
        routes,
        addRouters: [],
        authTreeData: null, // 系统所有功能
        roleTreeData: null, // 系统所有角色
    },
    getters: {
        routes(state) {
            console.log('routes', state);
            return state.routes;
        }
    },
    actions: {
    },
};
