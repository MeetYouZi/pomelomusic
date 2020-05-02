<template>
  <transition name="miniplay">
    <div class="pomelo-play" v-show="!fullScreen">
      <div class="icon">
        <div class="imgWrapper" ref="miniWrapper">
          <img ref="miniImage" :class="cdCls" width="44" height="44" :src="currentSong.image">
        </div>
      </div>
      <div class="text">
        <h2 class="name" v-html="currentSong.name"></h2>
        <p class="desc" v-html="currentSong.singer"></p>
      </div>
      <div class="control">
        <progress-circle :radius="radius" :percent="percent">
<!--          <i @click.stop="togglePlaying" class="iconfont iconpause1 icon-mini" :class="miniIcon"></i>-->
        </progress-circle>
      </div>
      <div class="control" @click.stop="showPlaylist">
        <i class="iconfont iconplay_fill"></i>
      </div>
      <!--播放器-->
      <audio ref="pomelomusicAudio" @timeupdate="updateTime"></audio>
    </div>
  </transition>
</template>

<script>
import progressCircle from '@/views/MusicList/components/progressCircle'
export default {
  name: 'pomeloPlay',
  components: {
    progressCircle
  },
  data () {
    return {
      radius: 32,
      fullScreen: false,
      miniIcon: '',
      currentTime: 0,
      playing: false,
      currentSong: {
        album: '我们在夏枝繁茂时再见',
        duration: 218.979,
        id: 1371353582,
        image: 'https://p1.music.126.net/mXqmc1nD5mu2S4pEvBVHzw==/109951164141857357.jpg',
        name: '我们在夏枝繁茂时再见',
        singer: '钱正昊',
        url: 'https://music.163.com/song/media/outer/url?id=1371353582.mp3'
      }
    }
  },
  computed: {
    cdCls () {
      return this.playing ? 'play' : ''
    },
    percent () {
      // return 0.3
      return this.currentSong.duration ? this.currentTime / this.currentSong.duration : 0
    }
  },
  methods: {
    // 更新时间
    updateTime (e) {
      this.currentTime = e.target.currentTime
    },
    togglePlaying () {
      const pomelomusicAudio = this.$refs.pomelomusicAudio
      pomelomusicAudio.src = this.currentSong.url
      pomelomusicAudio.play()
      this.playing = true
    },
    showPlaylist () {

    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.pomelo-play
  display: flex
  align-items: center
  position: fixed
  left: 0
  bottom: 0
  z-index: 180
  width: 100%
  height: 50px
  // background: var(--theme)
  background: #fff
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
          animation: rotate 10s linear infinite
        &.pause
          animation-play-state: paused
  .text
    display: flex
    flex: 1
    line-height: 20px
    overflow: hidden
    .name
      margin-bottom: 2px
      no-wrap()
      font-size: $font-size-medium
      color: $color-text
    .desc
      no-wrap()
      font-size: $font-size-small
      color: $color-text-d
  .control
    flex: 0 0 30px
    width: 31px
    height 31px
    border-radius 50%
    text-align center
    box-sizing border-box
    border 1px solid $color-theme
    position relative
    .iconfont
      font-size: 16px
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
