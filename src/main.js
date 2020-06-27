import 'babel-polyfill'
import Vue from 'vue'
import VueLazyload from 'vue-lazyload'
// import '@/assets/js/vueTouch'
import App from './App.vue'
import router from './router'
import store from './store'
import VueAwesomeSwiper from 'vue-awesome-swiper'
// import style
import 'swiper/css/swiper.css'
import $Alert from '@/components/api/alert'
// import $Loading from '@/components/api/customLoading'
// import '@/components/api/customLoading/v-loading'
import 'stylus/index.styl'

import youToast from '@/components/api/toast/api'
import youMessage from '@/components/api/message/api'

Vue.use(youToast)
Vue.use(youMessage)
Vue.use(VueAwesomeSwiper/* { default options with global component } */)

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
// Vue.prototype.$loading = $Loading

// 版权信息
window.pomelomusic = `欢迎使用 pomelomusic!
当前版本为：开发阶段...
作者：小柚姑娘
Github：https://github.com/MeetYouZi/pomelomusic
歌曲来源于网易云音乐 (https://music.163.com)`
// eslint-disable-next-line
console.info(`%c${window.pomelomusic}`, `color:blue`)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
