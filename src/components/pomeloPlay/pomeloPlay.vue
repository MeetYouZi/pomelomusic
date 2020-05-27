<template>
  <div class="pomelo-module">
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
                @empty="handleEmpty"
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
    <transition name="miniplay">
      <div class="pomelo-play" v-show="isShowPlay && !fullScreen" @swiperight="swiperight(x)">
        <div class="icon" @click="handleToUrl">
          <div class="imgWrapper" ref="miniWrapper">
            <img ref="miniImage" :class="cdCls" width="44" height="44" v-lazy="`${currentSong.image}?param=100y100`">
          </div>
        </div>
        <div class="text">
          <h2 class="name" v-html="currentSong.name"></h2>
          <p class="desc" v-html="currentSong.singer"></p>
        </div>
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
        <!--播放器-->
        <audio ref="pomelomusicAudio"
               @timeupdate="updateTime"
               @ended="end"
               @pause="paused"
        ></audio>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import progressCircle from '@/components/progress/progressCircle'
import playList from '@/components/playList/playList'
import { playMode } from '@/assets/js/playMode'
import { SET_PLAY_MODE } from '@/assets/js/mixin'

export default {
  name: 'pomeloPlay',
  components: {
    progressCircle,
    playList
  },
  mixins: [SET_PLAY_MODE],
  data () {
    return {
      radius: 30,
      musicReady: false, // 是否可以使用播放器
      fullScreen: false,
      currentTime: 0
      // currentSong: {
      //   album: '我们在夏枝繁茂时再见',
      //   duration: 218.979,
      //   id: 1371353582,
      //   image: 'https://p1.music.126.net/mXqmc1nD5mu2S4pEvBVHzw==/109951164141857357.jpg',
      //   name: '我们在夏枝繁茂时再见',
      //   singer: '钱正昊',
      //   url: 'https://music.163.com/song/media/outer/url?id=1371353582.mp3'
      // }
    }
  },
  computed: {
    cdCls () {
      return this.playing ? 'play' : ''
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
    ...mapGetters([
      'playing',
      'playMode',
      'playList',
      'currentSong',
      'currentIndex',
      'currentTime'
    ])
  },
  watch: {
    playing (newPlaying) {
      const pomelomusicAudio = this.$refs.pomelomusicAudio
      this.$nextTick(() => {
        newPlaying ? pomelomusicAudio.play() : pomelomusicAudio.pause()
        // newPlaying ? silencePromise(audio.play()) : audio.pause()
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
    }
  },
  methods: {
    handleEmpty () {
      this.fullScreen = false
    },
    selectItem (item, index) {
      this.setCurrentIndex(index)
      // this.selectPlay({
      //   list: this.songList,
      //   index
      // })
    },
    handleToUrl () {
      this.$router.push(`/playSong/${this.currentSong.id}`)
    },
    swiperight () {
      alert('8888')
      this.next()
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
        pomelomusicAudio.play()
        this.setPlayingState(true)
      } else {
        pomelomusicAudio.pause()
        this.setPlayingState(false)
      }
    },
    handleclose () {
      this.fullScreen = false
    },
    showPlaylist () {
      this.fullScreen = true
    },
    paused () {
      this.setPlayingState(false)
    },
    end () {
      this.currentTime = 0
      if (this.mode === playMode.loop) {
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
    ...mapActions(['selectPlay']),
    ...mapMutations({
      setPlaylist: 'SET_PLAYLIST',
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
      font-size $font-size-medium
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
      span
        color var(--c_txt1)
        font-size $font-size-medium
        font-weight bold
      .iconfont
        color var(--c_txt2)
        display inline-block
        font-size $font-size-large
        width 22px
        height 20px
    .music-play-list
      flex 1
      overflow scroll
    .playlist-close
      bottom 0
      left 0
      height 44px
      line-height 44px
      width 100%
      text-align center
      color var(--c_txt1)
      font-size $font-size-medium
  .pomelo-play
    display: flex
    align-items: center
    position: fixed
    left: 0
    bottom: 50px
    z-index: 180
    width: 100%
    height: 50px
    background var(--playBg)
    &.miniplay-enter-active, &.miniplay-leave-active
      transition: all 0.4s
    &.miniplay-enter, &.miniplay-leave-to
      opacity: 0
    .icon
      flex: 0 0 44px
      width: 44px
      height: 44px
      padding: 0 10px 0 20px
      margin-top -20px
      .imgWrapper
        height: 100%
        width: 100%
        img
          border-radius: 50%
          &.play
            animation rotate 10s linear infinite
          &.pause
            animation-play-state: paused
    .text
      display flex
      flex 1
      line-height 20px
      overflow hidden
      .name
        margin-bottom: 2px
        no-wrap()
        font-size $font-size-medium
        color var(--color)
        padding-right 2px
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
