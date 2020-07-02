'use strict';
const {NODE_ENV, VUE_APP_BASE_API, VUE_APP_CDN, ENV} = process.env;
const port = 3888;
const isDev = NODE_ENV === 'development';

module.exports = {
    publicPath: VUE_APP_CDN,
    outputDir: 'dist',
    assetsDir: 'static',
    lintOnSave: isDev,
    productionSourceMap: ENV === 'test',
    devServer: {
        port,
        open: isDev,
        proxy: {
            '/tapi': {
                target: VUE_APP_BASE_API,
                changeOrigin: true,
                pathRewrite: {
                    '^/tapi': '/tapi'
                }
            },
            '/napi': {
                target: VUE_APP_BASE_API,
                changeOrigin: true,
                pathRewrite: {
                    '^/napi': '/napi'
                }
            },
            '/wapi': {
                target: VUE_APP_BASE_API,
                changeOrigin: true,
                pathRewrite: {
                    '^/wapi': '/wapi'
                }
            },
        }
    },
    chainWebpack(config) {
        // config.plugin('HardSourceWebpackPlugin').use('hard-source-webpack-plugin');
    },
};
