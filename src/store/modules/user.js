import { SET_USERINFO } from '@/store/mutation-types';
import {
  login,
  LoginParam,
  fetchUserInfo,
  logout,
} from '@/api/auth';
import { ActionContext } from 'vuex';
import Cookies from 'js-cookie';
import router from '../../router';
const State = {
  userInfo: {
    id: 0,
    mobile: '',
    realName: '',
    avatar: '',
  }
}

export default {
  namespaced: true,
  state: {
    userInfo: null,
    identity: null,
  },
  getters: {
    // 用户名
    username(state: State) {
      if (!state.userInfo) {
        return null;
      }
      return state.userInfo.realName;
    },
    // 头像
    avatar(state: any) {
      if (!state.userInfo || !state.userInfo.avatar) {
        return null;
      }
      try {
        const avatar = JSON.parse(state.userInfo.avatar);
        if (!avatar.path || !avatar.host) {
          return require('@/assets/images/profile.png');
        }
        return avatar.host + '/' + avatar.path;
      } catch (e) {
        return null;
      }
    },
    identity(state: any) {
      if (!state.userInfo || !state.identity) {
        return null;
      }
      return state.identity;
    },
    userRole(state: any) {
      const roles = Object.keys(state.identity || {});
      return roles.length ? roles[0] : 'teacher';
    },
  },
  mutations: {
    [SET_USERINFO](state: State, info: State['userInfo']) {
      state.userInfo = info;
    },
  },
  actions: {
    async login(context: ActionContext<State, any>, data: LoginParam) {
      await login(data);
      await context.dispatch('checkUser');
    },
    // 检查用户登录态
    async checkUser(context: ActionContext<State, any>, authToken: any) {
      if (authToken) {
        const tokenKey = authToken.token ? authToken.token : null;
        if (tokenKey) {
          const tokenParam = {
            auth_token: tokenKey,
          };
          // await getCookiesByToken(tokenParam);
          const { data } = await fetchUserInfo();
          context.commit(SET_USERINFO, data.detail);
        }
      }

      if (!Cookies.get('chn_energy_sign')) {
        throw new Error('登录已失效');
      }

      if (authToken) {
        if (authToken.preloca) {
          router.push({ path: authToken.preloca });
        }
      }

      if (context.state.userInfo) {
        return;
      }
      const userResp = await fetchUserInfo();
      context.commit(SET_USERINFO, userResp.data.detail);
    },
    // 退出登录
    async logout(context: ActionContext<any, any>) {
      await logout();
      context.commit(SET_USERINFO, null);
    },
    async updateUserinfo(context: ActionContext<any, any>, state: State) {
      context.commit(SET_USERINFO, state);
    },
  },
};
