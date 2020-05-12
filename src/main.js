import 'babel-polyfill'
import Vue from 'vue'
import VueLazyload from 'vue-lazyload'
// import '@/assets/js/vueTouch'
import App from './App.vue'
import router from './router'
import store from './store'
import 'stylus/index.styl'

Vue.config.productionTip = false
Vue.use(VueLazyload)
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: 'dist/error.png',
  loading: 'dist/loading.gif',
  attempt: 1
})

// 初始化主题
document.querySelector('html').className = 'white'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
