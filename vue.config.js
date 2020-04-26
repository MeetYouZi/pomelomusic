const path = require('path')

function resolve (dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  publicPath: './',

  productionSourceMap: false,
  lintOnSave: true,
  chainWebpack: config => {
    config.entry.app = ['babel-polyfill', './src/main.js']
    config.resolve.alias
      .set('@', resolve('src'))
      .set('stylus', resolve('src/assets/stylus'))
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
    types.forEach(type => addStyleResource(config.module.rule('stylus').oneOf(type)))
  },
  devServer: {
    disableHostCheck: true,
    proxy: {
      '/api': {
        target: process.env.VUE_APP_BASE_API_URL,
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}
function addStyleResource (rule) {
  rule.use('style-resource')
    .loader('style-resources-loader')
    .options({
      patterns: [
        path.resolve(__dirname, './src/assets/stylus/mixin.styl'),
        path.resolve(__dirname, './src/assets/stylus/base.styl')
      ]
    })
}
