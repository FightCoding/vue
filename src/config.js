const {NODE_ENV, VUE_APP_BASE_API, VUE_APP_CDN} = process.env;


export default {
  host: VUE_APP_BASE_API,
  cdn: VUE_APP_CDN,
  baseUrl: NODE_ENV === 'development' ? '/' : VUE_APP_BASE_API, // 地址
  timeout: 10 * 1000,
};
