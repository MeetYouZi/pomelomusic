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
    <dialog-box ref="dialogBox" :contentText="dialogText"></dialog-box>
<!--    <tab-nav></tab-nav>-->
  </div>
</template>

<script>
import pomeloPlay from '@/components/pomeloPlay/pomeloPlay'
import dialogBox from '@/components/dialog/dialog'

const dialogText = `
1、 新增我的页面 UID 登录及我的音乐列表<br>
2、 新增 miniPlay 滑动切换<br>
3、 新增播放进度条按下拖动的样式<br>
4、 新增首页轮播图<br>
5、 新增默认音乐<br>
6、 新增首页加载新功能提醒
`

export default {
  components: {
    pomeloPlay,
    dialogBox
  },
  data () {
    return {
      transitionName: 'slide-right',
      BackPage: false,
      dialogText: ''
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
    setTimeout(() => {
      this.$refs.dialogBox.show()
    }, 1000)
  },
  created () {
    this.dialogText = dialogText
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
