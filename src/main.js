import 'babel-polyfill'
import Vue from 'vue'
import VueLazyload from 'vue-lazyload'
// import '@/assets/js/vueTouch'
import App from './App.vue'
import router from './router'
import store from './store'
import $Alert from '@/components/api/alert'
import 'stylus/index.styl'

import youToast from '@/components/api/toast/api'
Vue.use(youToast)
// Vue.prototype.$mmToast('哈哈哈f11ffffffff哈')

Vue.config.productionTip = false
Vue.use(VueLazyload, {
  error: require('../src/assets/img/error.jpeg'),
  loading: require('../src/assets/img/loading.jpeg'),
  attempt: 1
})

// 初始化主题
const themeBg = localStorage.getItem('pomelomusic_themeBg') || 'white'
document.querySelector('html').className = themeBg

Vue.prototype.$Alert = $Alert

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
