import Vue from 'vue'
import VueRouter from 'vue-router'
const Home = () => import('@/views/Home/Home')
const MusicList = () => import('@/views/MusicList/MusicList')
const Recommend = () => import('@/views/Recommend/Recommend')
const About = () => import('@/views/About')
const Music = () => import('@/views/music')
const PlaySong = () => import('@/views/PlaySong/PlaySong')
const Personal = () => import('@/views/Personal/Personal')
const Album = () => import('@/views/Album/Album')
const MvDetail = () => import('@/views/MV/MvDetail')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  }, {
    path: '/',
    name: 'Music',
    component: Music,
    children: [
      {
        path: 'home',
        name: 'Home',
        component: Home,
        meta: {
          index: 0,
          requiresAuth: false
        }
      }, {
        path: 'recommend',
        name: 'Recommend',
        component: Recommend,
        meta: {
          index: 0,
          requiresAuth: false
        }
      }, {
        path: '/personal',
        name: 'Personal',
        component: Personal,
        meta: {
          index: 0,
          requiresAuth: false
        }
      }
    ]
  }, {
    path: '/musicList/:id',
    name: 'MusicList',
    component: MusicList,
    meta: {
      index: 1,
      requiresAuth: false
    }
  }, {
    path: '/playSong/:id',
    name: 'PlaySong',
    component: PlaySong,
    meta: {
      index: 1,
      requiresAuth: false
    }
  }, {
    path: '/about',
    name: 'About',
    component: About
  }, {
    path: '/album/:rid',
    name: 'Album',
    component: Album
  }, {
    path: '/mvDetail/:mvid',
    name: 'MvDetail',
    component: MvDetail,
    meta: {
      index: 1,
      requiresAuth: false
    }
  }
]

const router = new VueRouter({
  routes,
  scrollBehavior (to, from, savedPosition) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({ x: 0, y: 0 })
      }, 100)
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
