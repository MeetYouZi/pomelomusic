<template>
  <div ref="musicListWarp" class="music_list_warp">
    <div class="top_wrap">
      <img class="top_wrap_bg" v-lazy="headerImgCover" />
    </div>
    <div class="opt_box">
      <div class="author">
        <div class="author_hd">
<!--          <img class="author_avatar" src="//y.gtimg.cn/mediastyle/mod/mobile/img/logo.svg?max_age=2592000"/>-->
          <h3 class="author_name">{{playlist.name}}</h3>
        </div>
        <div class="author_desc">{{playlist.description}}</div>
      </div>

      <div class="play_bar_wrap">
        <div class="play_bar" :class="{'fixed': showAbs}">
          <div class="play_all" @click.stop="togglePalying">
            <i class="play_icon play_all_icon" v-show="!playing"></i>
            <i class="play_icon iconfont iconpause1" v-show="playing"></i>
            <div class="progressBox" v-show="playing">
              <progress-circle
                :radius="34"
                :percent="percent"
              >
              </progress-circle>
            </div>
            <span class="play_all_text">{{!playing ? '播放全部' : currentSong.name}}</span>
          </div>
          <div class="collect">
            <i class="collect_icon"></i>
            收藏歌单
          </div>
          <div class="progress-bar" v-show="playing">
            <progress-bar
              :percent="percent"
              @percentChange="percentChange"
              :currentProgress="currentProgress"
            >
            </progress-bar>
          </div>
        </div>
      </div>
    </div>
    <music-play-list :songList="songList" @selectItem="selectItem"></music-play-list>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import { getListDetail, getSongDetail } from '@/api'
import formatSongs from '@/utils/song'
import ProgressBar from '@/components/progress/progressBar'
import ProgressCircle from '@/components/progress/progressCircle'
import MusicPlayList from '@/components/musicList/musicList'
import { SET_PLAYING_TIME, SET_PLAY } from '@/assets/js/mixin'

const MAXLENGTH = 100
export default {
  name: 'MusicList',
  components: {
    ProgressBar,
    ProgressCircle,
    MusicPlayList
  },
  mixins: [SET_PLAYING_TIME, SET_PLAY],
  data () {
    return {
      id: '',
      playlist: {},
      privileges: [],
      songList: [],
      songUrl: '',
      songReady: true,
      showAbs: false
    }
  },
  computed: {
    ...mapGetters(['currentSong', 'playing', 'currentTime', 'currentProgress']),
    headerImgCover () {
      let img = ''
      if (this.currentSong.id) {
        img = this.currentSong.image
      } else {
        img = this.playlist.coverImgUrl
      }
      return img
    }
  },
  watch: {
    currentSong (newSong, oldSong) {
      if (!newSong.id || !newSong.url || newSong.id === oldSong.id) {
        return
      }
      this.songReady = false
    }
  },
  methods: {
    handleScroll () {
      const top = document.documentElement.scrollTop
      if (top < 310) {
        this.$refs.musicListWarp.style.zIndex = '11'
        this.showAbs = false
      } else {
        this.$refs.musicListWarp.style.zIndex = '1000'
        this.showAbs = true
      }
    },
    // 选择播放事件
    selectItem (item, index) {
      this.selectPlay({
        list: this.songList,
        index
      })
      this.$router.push(`/playSong/${item.id}`)
    },
    ...mapActions(['selectPlay']),
    ...mapMutations({
      setPlayState: 'SET_PLAYINGSTATE'
    }),
    togglePalying () {
      // const audio = this.$refs.pomelomusicAudio
      // audio.pause()
      if (!this.playing) {
        const index = 0
        this.selectPlay({
          list: this.songList,
          index
        })
      } else {
        this.setPlayState(!this.playing)
      }
    },
    _getListDetail () {
      getListDetail({ id: this.id }).then(res => {
        this.playlist = res.playlist
        document.title = this.playlist.name
        this._getSongDetail(this.playlist)
      })
    },
    _getSongDetail (playlist) {
      const trackIds = playlist.trackIds.map(({ id }) => id)
      getSongDetail(trackIds.slice(0, MAXLENGTH)).then(res => {
        this.songList = formatSongs(res.songs)
      })
    }
  },
  mounted () {
    window.addEventListener('scroll', this.handleScroll)
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.handleScroll)
  },
  created () {
    this.id = this.$route.params.id
    this._getListDetail()
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.music_list_warp
  z-index 11
  background var(--color_white)
.top_wrap
  position relative
  height 236px
  overflow hidden
  .top_wrap_bg
    position absolute
    top 0
    left 0
    z-index 3
    width 100%
    height 100%
    object-fit cover
.opt_box
  position relative
  z-index 10
  margin -4px 16px 12px
  border-radius 2px
  background var(--searchBg)
  box-shadow 0 0 12px 0 rgba(0,0,0,.06)
  .author
    padding: 10px 16px;
    overflow: hidden;
    border-bottom: solid 1px rgba(0,0,0,.04)
    .author_hd
      display flex
      align-items center
      margin-bottom 8px
    .author_desc
      color var(--c_txt2)
      text-align justify
      line-height 18px
      font-size $font-size-small
      no-wrap-number(4)
    .author_avatar
      display block
      width 20px
      height 20px
      margin-right 10px
      border-radius 100%
    .author_name
      font-size $font-size-medium
      color var(--c_txt1)
  .play_bar_wrap
    height 55px
    position relative
    .progressBox
      position absolute
      width 34px
      height 34px
    .progress-bar
      position absolute
      left 0
      bottom -7px
      width 100%
    .play_bar
      display flex
      justify-content space-between
      align-items center
      padding 0 12px
      &.fixed
        fixTop()
        background var(--searchBg)
        box-shadow 0 0 12px 0 rgba(0,0,0,.06)
        transition all .1s
        z-index 1000
      .play_all
        flex 1
        display flex
        align-items center
        justify-content flex-start
        font-size $font-size-medium
        overflow hidden
        .play_all_text
          flex 1
          margin-left 10px
          text-align left
          color var(--c_txt1)
          no-wrap()
        .play_icon
          display: flex
          align-items center
          justify-content center
          width 34px
          height 34px
          box-sizing border-box
          border-radius 100%
          border 1px solid $color-theme
        .play_all_icon
          background $color-theme
          &:before
            content ""
            display block
            height 0
            width 0
            margin-right -13px
            border-color transparent transparent transparent #fff
            border-width 7px 11px
            border-style solid
            border-radius 2px
        .iconpause1
          font-size 22px
          color $color-theme
      .collect
        height 55px
        display flex
        align-items center
        font-size $font-size-small
        color var(--color)
</style>
