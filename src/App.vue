<template>
  <div id="app">
    <transition :name="transitionName">
      <keep-alive exclude="MusicList">
        <router-view class="rv"/>
      </keep-alive>
    </transition>
    <pomelo-play></pomelo-play>
<!--    <tab-nav></tab-nav>-->
  </div>
</template>

<script>
import pomeloPlay from '@/components/pomeloPlay/pomeloPlay'
export default {
  components: {
    pomeloPlay
  },
  data () {
    return {
      transitionName: 'slide-right'
    }
  },
  // watch $route 决定使用哪种过渡
  watch: {
    '$route' (to, from) {
      const toDepth = to.meta.index
      const fromDepth = from.meta.index
      this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
    }
  },
  methods: {
    removeAnimate () {
      // 首次加载完成后移除动画
      let loadDOM = document.querySelector('#appLoadingBox')
      if (loadDOM) {
        const animationendFunc = function () {
          loadDOM.removeEventListener('animationend', animationendFunc)
          loadDOM.removeEventListener('webkitAnimationEnd', animationendFunc)
          document.body.removeChild(loadDOM)
          loadDOM = null
        }
        loadDOM.addEventListener('animationend', animationendFunc)
        loadDOM.addEventListener('webkitAnimationEnd', animationendFunc)
        loadDOM.classList.add('removeAnimate')
      }
    }
  },
  mounted () {
    this.removeAnimate()
  }
}
</script>
<style lang="stylus" scoped>
#app
  font-family Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  height 100%
  .rv
    position absolute
    width 100%
    transition all ease .5s
    &.slide-left-enter, &.slide-right-leave-active
      transform translate3d(100%, 0, 0)
    &.slide-left-leave-active, &.slide-right-enter
      opacity 0
      transform translate3d(-100% 0, 0)
</style>
