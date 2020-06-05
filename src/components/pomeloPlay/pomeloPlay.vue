<template>
  <div class="pomelo-module" v-show="!miniPlayHide">
    <popup-play-list ref="popUpPlayList" @handleClose="handleClose"></popup-play-list>
    <transition name="miniplay">
      <div class="pomelo-play"
           v-show="isShowPlay && !fullScreen"
           @click="handleToUrl"
      >
        <swiper
          ref="mySwiper"
          :options="swiperOptions"
        >
          <swiper-slide v-for="music in playList" :key="music.id">
            <div class="icon">
              <div class="imgWrapper" ref="miniWrapper">
                <img ref="miniImage"
                     class="play"
                     :class="currentSong.id === music.id ? cdCls: ''"
                     width="44"
                     height="44"
                     v-lazy="`${music.image}?param=100y100`"
                >
              </div>
            </div>
            <div class="text">
              <h2 class="name" v-text="music.name"></h2>
              <p class="desc" v-text="music.singer"></p>
            </div>
          </swiper-slide>
        </swiper>
        <div class="control">
          <div class="progress-circle-box">
            <progress-circle :radius="radius" :percent="percent">
            </progress-circle>
            <i @click.stop="togglePlaying"
               class="iconfont icon-mini"
               :class="miniIcon"
            ></i>
          </div>
        </div>
        <div class="control menu" @click.stop="showPlaylist">
          <i class="iconfont iconmenuoff"></i>
        </div>
      </div>
    </transition>
    <!--播放器-->
    <audio ref="pomelomusicAudio"
           @playing="readyPlaying"
           @timeupdate="updateTime"
           @ended="end"
           @pause="paused"
           @error="error"
    ></audio>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import progressCircle from '@/components/progress/progressCircle'
import popupPlayList from '@/components/popupPlayList/popupPlayList'
import { playMode } from '@/assets/js/playMode'
import { SET_PLAY_MODE } from '@/assets/js/mixin'
import vueTouch from '@/assets/js/vueTouch'

export default {
  name: 'pomeloPlay',
  components: {
    progressCircle,
    popupPlayList
  },
  mixins: [SET_PLAY_MODE],
  data () {
    return {
      radius: 30,
      musicReady: false, // 是否可以使用播放器
      fullScreen: false,
      currentTime: 0,
      miniPlayHide: false,
      swiperOptions: {
        initialSlide: this.currentIndex,
        on: {
          slideChange: () => {
            const swiper = this.$refs.mySwiper.swiperInstance
            if (this.currentIndex !== swiper.activeIndex) {
              this.setCurrentIndex(swiper.activeIndex)
              if (!this.playing) {
                this.togglePlaying()
              }
            }
            // Vue.onChange(this.slideCurrentIndex)
            // alert('改变了，activeIndex为' + this.activeIndex)
          }
        }
      }
      // currentSong: {
      //   album: '我们在夏枝繁茂时再见',
      //   duration: 218.979,
      //   id: 1371353582,
      //   image: 'https://p1.music.126.net/mXqmc1nD5mu2S4pEvBVHzw==/109951164141857357.jpg',
      //   name: '我们在夏枝繁茂时再见',
      //   Singer: '钱正昊',
      //   url: 'https://music.163.com/song/media/outer/url?id=1371353582.mp3'
      // }
    }
  },
  computed: {
    cdCls () {
      return this.playing ? '' : 'pause'
    },
    miniIcon () {
      return this.playing ? 'iconpause1' : 'iconplay'
    },
    percent () {
      // return 0.3
      return this.currentSong.duration ? this.currentTime / this.currentSong.duration : 0
    },
    isShowPlay () {
      return this.currentSong.id
    },
    swiper () {
      return this.$refs.mySwiper.$swiper
    },
    ...mapGetters([
      'playing',
      'playMode',
      'playList',
      'currentSong',
      'currentIndex'
    ])
  },
  watch: {
    $route (to, from) {
      if (to.path === '/home' || to.path === '/recommend' || to.path === '/personal') {
        this.miniPlayHide = false
      } else {
        this.miniPlayHide = true
      }
    },
    playing (newPlaying) {
      const pomelomusicAudio = this.$refs.pomelomusicAudio
      if (!pomelomusicAudio.src) pomelomusicAudio.src = this.currentSong.url
      this.$nextTick(() => {
        newPlaying ? pomelomusicAudio.play() : pomelomusicAudio.pause()
        this.musicReady = true
      })
    },
    currentSong (newSong, oldSong) {
      if (!newSong.id || !newSong.url || newSong.id === oldSong.id) {
        return
      }
      this.musicReady = false
      this.$refs.pomelomusicAudio.src = newSong.url
      this.$refs.pomelomusicAudio.play()
      // 若歌曲 5s 未播放，则认为超时，修改状态确保可以切换歌曲。
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.musicReady = true
      }, 5000)
    },
    currentIndex (newValue) {
      this.$nextTick(() => {
        this.swiper.slideTo(newValue, 1000, false)
        console.log(newValue, 'currentIndex')
      })
    }
  },
  methods: {
    handleEmpty () {
      this.fullScreen = false
    },
    handleToUrl () {
      this.$router.push(`/playSong/${this.currentSong.id}`)
    },
    touchNext () {
      this.next()
      this.$nextTick(() => {
        this.$youToast(`下一曲 ${this.currentSong.name}`)
      })
    },
    touchPrev () {
      this.prev()
      this.$nextTick(() => {
        this.$youToast(`上一曲 ${this.currentSong.name}`)
      })
    },
    // 更新时间
    updateTime (e) {
      this.currentTime = e.target.currentTime
      this.setCurrentTime(this.currentTime)
    },
    togglePlaying () {
      const pomelomusicAudio = this.$refs.pomelomusicAudio
      if (!this.playing && !this.currentSong.id) {
        return
      }
      if (!this.playing && this.currentSong.id) {
        if (!pomelomusicAudio.src) pomelomusicAudio.src = this.currentSong.url
        pomelomusicAudio.play()
        this.setPlayingState(true)
      } else {
        pomelomusicAudio.pause()
        this.setPlayingState(false)
      }
    },
    handleClose () {
      this.fullScreen = false
    },
    showPlaylist () {
      this.$refs.popUpPlayList.isShow()
      this.fullScreen = true
    },
    readyPlaying () {
      this.setHistory(this.currentSong)
    },
    error () {
      this.$youToast('播放失败')
      console.log('error')
      this.next()
    },
    paused () {
      this.setPlayingState(false)
    },
    prev () {
      if (this.playList.length === 1) {
        this.loop()
      } else {
        let index = this.currentIndex - 1
        if (index === -1) {
          index = this.playList.length - 1
        }
        this.setCurrentIndex(index)
        if (!this.playing) {
          this.togglePlaying()
        }
      }
    },
    end () {
      this.currentTime = 0
      if (this.playMode === playMode.sequence) {
        this.loop()
      } else {
        this.next()
      }
    },
    loop () {
      this.$refs.pomelomusicAudio.currentTime = 0
      this.$refs.pomelomusicAudio.play()
      this.setPlayingState(true)
    },
    next () {
      // if (!this.songReady) {
      //   return
      // }
      if (this.playList.length === 1) {
        this.loop()
      } else {
        let index = this.currentIndex + 1
        if (index === this.playList.length) {
          index = 0
        }
        this.setCurrentIndex(index)
        if (!this.playing) {
          this.togglePlaying()
        }
      }
    },
    ...mapActions(['selectPlay', 'setHistory']),
    ...mapMutations({
      setAudioEle: 'SET_AUDIOELE',
      setCurrentIndex: 'SET_CURRENTINDEX',
      setCurrentTime: 'SET_CURRENTTIME',
      setPlayingState: 'SET_PLAYINGSTATE'
    })
  },
  mounted () {
    this.$nextTick(() => {
      this.setAudioEle(this.$refs.pomelomusicAudio)
    })
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .pomelo-module
    position relative
    z-index 10
  .pomelo-play
    display flex
    align-items center
    position fixed
    left 0
    bottom 50px
    z-index 180
    width 100%
    height 50px
    background var(--playBg)
    backdrop-filter saturate(180%) blur(5px)
    &.miniplay-enter-active, &.miniplay-leave-active
      transition all 0.4s
    &.miniplay-enter, &.miniplay-leave-to
      opacity 0
    >>>.swiper-container
      height 64px
      margin 0
      flex 1
      &:after
        content ""
        position absolute
        right 0
        bottom 0
        z-index 2
        width 60px
        height 56px
        background-image linear-gradient(to right , var(--bg-linear-gradient-1) 0, var(--bg-linear-gradient-3) 100%)
    >>>.swiper-slide
      display flex
      align-items center
      justify-content flex-start
    .icon
      flex 0 0 44px
      width 44px
      height 44px
      padding 0 10px 0 20px
      margin-top -20px
      .imgWrapper
        height 100%
        width 100%
        img
          border-radius 50%
          &.play
            animation rotate 10s linear infinite
          &.pause
            animation-play-state: paused
    .text
      display flex
      flex 1
      line-height 20px
      overflow hidden
      vertical-align bottom
      .name
        margin-bottom 2px
        no-wrap()
        font-size $font-size-medium
        color var(--color)
        padding-right 2px
        margin-right 4px
      .desc
        no-wrap()
        font-size $font-size-small
        color var(--c_txt2)
    .control
      flex: 0 0 30px
      display flex
      align-items center
      justify-content center
      width 30px
      height 30px
      border-radius 50%
      text-align center
      box-sizing border-box
      border 1px solid $color-theme
      position relative
      margin-right 10px
      &.menu
        font-size 20px
        border 0px solid $color-theme
        .iconfont
          font-weight 600
      .progress-circle-box
        position absolute
        width 30px
        height 30px
      .iconfont
        font-size: 20px
        color: $color-theme
        line-height 30px
        text-align center
      .icon-mini
        color: $color-theme
        font-size: 20px
        position absolute
        text-align center
        left 50%
        top 50%
        transform translate(-50%, -50%)
    @keyframes rotate
      0%
        transform: rotate(0)
      100%
        transform: rotate(360deg)
</style>
