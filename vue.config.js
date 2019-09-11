// vue.config.js
const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
    publicPath: './',
    assetsDir: 'assets',
    productionSourceMap: false,
    chainWebpack: config => {
    	config.resolve.alias
    	     .set('@', resolve('src'))
    	     .set('@c', resolve('src/components'))
	    config.output.filename('[name].[hash].js').end();
    },
    devServer: {
        /**
         * proxy: {
         *     '/api': {
         *         target: 'http://192.168.14.29:31006/xindai/',
         *         changeOrigin: true,
         *         ws: true,
         *         pathRewrite: {
         *             '^/api': '/',
         *         }
         *     }
         * },
         */
    },
}