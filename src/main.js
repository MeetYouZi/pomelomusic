import 'babel-polyfill'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'stylus/index.styl'

Vue.config.productionTip = false

// 初始化主题
document.querySelector('html').className = 'white'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
