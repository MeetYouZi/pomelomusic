<template>
  <div class="popupPlayList">
    <transition name="fade">
      <div class="playlist-mask" v-show="fullScreen" @click="handleClose">
        <transition name="playlist">
          <div class="playlist-bg" v-show="fullScreen">
            <div class="playlist-bg-box">
              <swiper ref="mySwiper" :options="swiperOptions">
                <swiper-slide>
                  <div class="playlist-title">
                    <!--              {{playlistTitle}}-->
                    播放列表
                    <div class="close-icon-fix" @click.stop="handleRemove">
                      清空
                    </div>
                  </div>
                  <div class="play_mode" @click.stop="changeMode">
                    <i class="iconfont" :class="iconMode"></i>
                    <span>{{modeWord}}</span>
                  </div>
                  <div class="music-play-list">
                    <play-list
                      :songList="playList"
                      @selectItem="selectItem"
                      :type="'playList'"
                    >
                    </play-list>
                  </div>
                </swiper-slide>
                <swiper-slide>
                  <div class="playlist-title">
                    <!--              {{playlistTitle}}-->
                    历史播放列表
                    <div class="close-icon-fix" @click.stop="handleRemove">
                      清空
                    </div>
                  </div>
                  <div class="music-play-list">
                    <play-list
                      :songList="playHistory"
                      @selectItem="selectItem"
                      :type="'playHistoryList'"
                    >
                    </play-list>
                  </div>
                </swiper-slide>
                <div class="swiper-pagination" slot="pagination"></div>
              </swiper>
            </div>
            <!--            <div class="playlist-bg-fix"></div>-->
            <div class="playlist-close" @click="handleClose">
              关闭
            </div>
          </div>
        </transition>
      </div>
    </transition>
    <confirm ref="confirm" :text="confirmText" @toast="handleConfirm"></confirm>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import playList from '@/components/playList/playList'
import confirm from '@/components/confirm/confirm'
import { SET_PLAY_MODE } from '@/assets/js/mixin'

let slideCurrentIndex = 0

export default {
  name: 'popupPlayList',
  components: {
    playList,
    confirm
  },
  mixins: [SET_PLAY_MODE],
  computed: {
    ...mapGetters(['playList', 'playHistory']),
    confirmText () {
      return `确定要删除${this.playlistTitle}`
    },
    playlistTitle () {
      return this.activeIndex ? '历史播放' : '播放列表'
    }
  },
  watch: {
    slideCurrentIndex (newValue) {
      console.log(newValue, 'watch')
    }
  },
  data () {
    return {
      fullScreen: false,
      activeIndex: 0,
      slideCurrentIndex: 0,
      swiperOptions: {
        on: {
          slideChange: function () {
            slideCurrentIndex = this.activeIndex
            // Vue.onChange(this.slideCurrentIndex)
            // alert('改变了，activeIndex为' + this.activeIndex)
          }
        },
        pagination: {
          el: '.swiper-pagination'
        }
        // Some Swiper option/callback...
      }
    }
  },
  methods: {
    isShow () {
      this.fullScreen = true
    },
    handleConfirm () {
      if (!slideCurrentIndex) {
        this.clearPlayList()
      } else {
        if (this.playHistory.length) {
          this.clearHistory()
        } else {
          return this.$youToast('Nothing to clear')
        }
      }
      this.fullScreen = false
      this.$emit('handleClose')
      this.$youToast('success')
    },
    handleRemove () {
      this.activeIndex = slideCurrentIndex
      this.$refs.confirm.show()
    },
    handleClose () {
      this.fullScreen = false
      this.$emit('handleClose')
    },
    ...mapActions(['clearPlayList', 'clearHistory'])
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .popupPlayList
    position relative

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

  .playlist-bg-box
    position relative
    width 100%
    height 100%

    >>> .swiper-pagination
      position fixed
      bottom 50px

    >>> .swiper-pagination-bullet
      width 6px
      height 6px
      border 1px solid rgba(255, 255, 255, 0.1)
      background #ccc
      border-radius 50%
      opacity 1

    >>> .swiper-pagination-bullet-active
      border 1px solid #fff
      background #fff

    >>> .swiper-container
      padding-bottom 0px
      box-sizing border-box
      height 100%
      overflow-y scroll
</style>
