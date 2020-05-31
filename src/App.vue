<template>
  <div id="app">
    <div class="goBack" v-show="BackPage" @click="handleToBack">
      <i class="iconfont iconLeft"></i>
    </div>
    <transition :name="transitionName">
      <keep-alive exclude="MusicList,PlaySong,Comment,lyric,MvDetail,artists">
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
      transitionName: 'slide-right',
      BackPage: false
    }
  },
  // watch $route 决定使用哪种过渡
  watch: {
    '$route' (to, from) {
      this.BackPage = to.meta.index > 0 ? true : false
      const toDepth = to.meta.index
      const fromDepth = from.meta.index
      this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
    }
  },
  methods: {
    handleToBack () {
      this.$router.back()
    },
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
  .goBack
    position fixed
    top 10px
    left 16px
    width 38px
    height 38px
    border-radius 50%
    background rgba(0, 0, 0, 0.3)
    display flex
    align-items center
    justify-content center
    z-index 999
    .iconfont
      color #fff
      font-size $font-size-medium
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
