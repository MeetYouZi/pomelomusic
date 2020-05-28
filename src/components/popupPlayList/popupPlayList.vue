<template>
  <transition name="fade">
    <div class="playlist-mask" v-show="fullScreen" @click="handleclose">
      <transition name="playlist">
        <div class="playlist-bg" v-show="fullScreen">
          <!--            <div class="playlist-bg-fix"></div>-->
          <div class="playlist-title">
            播放列表
            <!--              <div class="close-icon-fix" @click="handleclose">-->
            <!--                <i class="iconfont icondown"></i>-->
            <!--              </div>-->
          </div>
          <div class="play_mode" @click.stop="changeMode">
            <i class="iconfont" :class="iconMode"></i>
            <span>{{modeWord}}</span>
          </div>
          <div class="music-play-list">
            <play-list
              :songList="playList"
              @selectItem="selectItem"
            >
            </play-list>
          </div>
          <div class="playlist-close" @click="handleclose">
            关闭
          </div>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script>
import { mapGetters } from 'vuex'
import playList from '@/components/playList/playList'
import { SET_PLAY_MODE } from '@/assets/js/mixin'

export default {
  name: 'popupPlayList',
  components: {
    playList
  },
  mixins: [SET_PLAY_MODE],
  computed: {
    ...mapGetters(['playList'])
  },
  data () {
    return {
      fullScreen: false
    }
  },
  methods: {
    isShow () {
      this.fullScreen = true
    },
    handleclose () {
      this.fullScreen = false
      this.$emit('handleclose')
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .playlist-mask
    position fixed
    left 0
    right 0
    top 0
    bottom 0
    z-index 100
    background rgba(0, 0, 0, 0.6)
    &.fade-enter, &.fade-leave-active
      opacity: 0
    &.fade-enter-active, &.fade-leave-active
      transition: all 0.3s ease-in-out
  .playlist-bg
    position fixed
    left 0
    right 0
    bottom 0
    z-index 1
    height 85%
    background var(--playlistBg)
    backdrop-filter saturate(180%) blur(6px)
    transition all 0.4s
    display flex
    flex-direction column
    &.playlist-enter-active, &.playlist-leave-active
      transition: all 0.4s ease-in-out
      .top, .bottom
        transition: all 0.4s cubic-bezier(0.86, 0.18, 0.82, 1.32)
    &.playlist-enter, &.playlist-leave-to
      transform: translate3d(0, 100px, 0)
      opacity 0
      .top
        transform: translate3d(0, -100px, 0)
      .bottom
        transform: translate3d(0, 100px, 0)
    .playlist-title
      height 40px
      line-height 40px
      text-align center
      font-size $font-size-large
      font-weight bold
      color var(--color)
      .close-icon-fix
        position absolute
        top 0
        right 16px
        .iconfont
          color var(--c_gray)
          font-size 16px
    .play_mode
      padding 4px 16px
      box-sizing border-box
      display flex
      align-items center
      line-height 26px
      vertical-align bottom
      span
        color var(--c_txt1)
        font-size $font-size-large
        font-weight bold
      .iconfont
        color var(--c_txt2)
        display inline-block
        font-size 22px
        width 26px
    .music-play-list
      flex 1
      overflow scroll
    .playlist-close
      bottom 0
      left 0
      border-top-1px(var(--bg_play_border))
      height 50px
      line-height 44px
      width 100%
      text-align center
      color var(--c_txt1)
      font-size $font-size-medium
</style>
