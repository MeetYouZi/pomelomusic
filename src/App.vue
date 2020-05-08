<template>
  <div id="app">
    <transition :name="transitionName">
      <keep-alive exclude="MusicList">
        <router-view class="rv"/>
      </keep-alive>
    </transition>
    <pomelo-play></pomelo-play>
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
      const toDepth = to.path.split('/').length
      const fromDepth = from.path.split('/').length
      this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
    }
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
