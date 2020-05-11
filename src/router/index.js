import Vue from 'vue'
import VueRouter from 'vue-router'
const Home = () => import('@/views/Home/Home')
const MusicList = () => import('@/views/MusicList/MusicList')
const Recommend = () => import('@/views/Recommend/Recommend')
const About = () => import('@/views/About')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  }, {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: {
      requiresAuth: false
    }
  }, {
    path: '/musicList/:id',
    name: 'MusicList',
    component: MusicList,
    meta: {
      requiresAuth: false
    }
  }, {
    path: '/recommend',
    name: 'Recommend',
    component: Recommend,
    meta: {
      requiresAuth: false
    }
  }, {
    path: '/about',
    name: 'About',
    component: About
  }
]

const router = new VueRouter({
  routes,
  scrollBehavior (to, from, savedPosition) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({ x: 0, y: 0 })
      }, 500)
    })
  }
})
// 判断是否需要登录拦截
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    // if (!auth.loggedIn()) {
    //   next({
    //     path: '/login',
    //     query: { redirect: to.fullPath }
    //   })
    // } else {
    //   next()
    // }
  } else {
    next() // 确保一定要调用 next()
  }
})

export default router
