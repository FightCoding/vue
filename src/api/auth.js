import request from '@/utils/request';

// 登录
export function login(data) {
    return request({
        url: '',
        data,
    });
}

// 获取用户信息
export function fetchUserInfo() {
    return request({
        url: '',
    });
}

// 退出登录
export function logout() {
    return request({
        url: '',
    });
}
