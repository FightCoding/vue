import axios, { AxiosRequestConfig } from 'axios';
import qs from 'qs';
import appConfig from '../config';

// 通用的请求工具
export const service = axios.create({
    baseURL: appConfig.baseUrl, // url = base url + request url
    timeout: appConfig.timeout, // request timeout
    method: 'POST',
    withCredentials: true, // send cookies when cross-domain requests
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
    },
});

// request interceptor
service.interceptors.request.use(
    (config: any) => {
        try {
            const baseURL = sessionStorage.baseURL;
            if (baseURL) {
                config.baseURL = '/dev';
                config.headers['dev-base-url'] = baseURL;
            }
        } catch (e) {
            console.log('request error:', e);
        }

        if (config.data && config.method === 'post' && config.headers['Content-Type'] === 'application/x-www-form-urlencoded') {
            config.data = qs.stringify(config.data);
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

service.interceptors.response.use(
    (response) => {
        const { success, errorCode } = response.data;
        // 50001 令牌失效（登录失效）
        if (!success && errorCode === '50001') {
            throw new Error('');
        }
        return response;
    },
    (error) => {
        // 网络错误，error.response为空，自定义网络错误信息
        const respMessage = error.message || '';
        if (respMessage.indexOf('Network Error') !== -1) {
            throw new Error('网络错误');
        }
        if (respMessage.indexOf('timeout') !== -1) {
            throw new Error('网络慢，请求超时');
        }
        if (!error.response) {
            throw new Error('网络错误');
        }
        throw error;
    },
);

export default async function <T = any>(config: AxiosRequestConfig): Promise<ServerResponse<T>> {
    const response = await service(config);
    const {data} = response;
    if (!data.success) {
        throw new Error(data.info);
    }
    return {
        ...data,
        _response: response,
    };
}
