<template>
  <div>
    <div class="top_wrap">
      <img class="top_wrap_bg" :src="playlist.coverImgUrl" />
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
        <div class="play_bar">
          <div class="play_all">
            <i class="play_all_icon"></i>
            <div class="progressBox" @click.stop="togglePalying">
              <progress-circle :radius="34" :percent="percent"></progress-circle>
            </div>
            <span class="play_all_text">{{songReady ? '播放全部' : currentSong.name}}</span>
          </div>
          <div class="collect">
            <i class="collect_icon"></i>
            收藏歌单
          </div>
        </div>
        <div class="progress-bar">
          <progress-bar :percent="percent"></progress-bar>
        </div>
      </div>
    </div>
    <div>
      <ul class="music-list">
        <li class="music-item"
            v-for="item in songList"
            :key="item.id"
            @click="handlePlaySong(item)"
            :class="{active: item.id == currentSong.id}"
        >
          <div class="item-box">
            <h3 class="list-tit"><span class="list-txt">{{item.name}}</span></h3>
            <p class="list-desc"><span class="list-txt">{{item.singer}}</span></p>
          </div>
        </li>
      </ul>
    </div>
    <!--播放器-->
    <audio ref="pomelomusicAudio" @timeupdate="updateTime"></audio>
  </div>
</template>

<script>
import { getListDetail, getSongDetail } from '@/api'
import formatSongs from '@/utils/song'
import ProgressBar from '@/views/MusicList/components/progressBar'
import ProgressCircle from '@/views/MusicList/components/progressCircle'

const PAGE_SIZE = 26
const MAXLENGTH = 100
export default {
  name: 'MusicList',
  components: { ProgressBar, ProgressCircle },
  data () {
    return {
      id: '',
      playlist: {},
      privileges: [],
      songList: [],
      songUrl: '',
      songReady: true,
      currentTime: 0,
      currentSong: {}
    }
  },
  computed: {
    percent () {
      // return 0.3
      return this.currentSong.duration ? this.currentTime / this.currentSong.duration : 0
    }
  },
  watch: {
    currentSong (newSong, oldSong) {
      if (!newSong.id || !newSong.url || newSong.id === oldSong.id) {
        return
      }
      this.songReady = false
      this.$refs.pomelomusicAudio.src = newSong.url
      this.$refs.pomelomusicAudio.play()
      // 若歌曲 5s 未播放，则认为超时，修改状态确保可以切换歌曲。
      // clearTimeout(this.timer)
      // this.timer = setTimeout(() => {
      //   this.songReady = true
      // }, 5000)
    }
  },
  methods: {
    // 更新时间
    updateTime (e) {
      this.currentTime = e.target.currentTime
    },
    togglePalying () {
      const audio = this.$refs.pomelomusicAudio
      audio.pause()
    },
    // 播放暂停事件
    handlePlaySong (item) {
      const audio = this.$refs.pomelomusicAudio
      if (this.songReady && item.id === this.currentSong.id) {
        this.songReady = false
        return audio.play()
      }
      if (!this.songReady && item.id && item.id === this.currentSong.id) {
        this.songReady = true
        return audio.pause()
      }
      if (item.id !== this.currentSong.id) {
        this.currentSong = item
      }
    },
    _getListDetail () {
      getListDetail({ id: this.id }).then(res => {
        this.playlist = res.playlist
        this._getSongDetail(this.playlist)
      })
    },
    _getSongDetail (playlist) {
      const trackIds = playlist.trackIds.map(({ id }) => id)
      getSongDetail(trackIds.slice(0, MAXLENGTH)).then(res => {
        // console.log(res)
        this.songList = formatSongs(res.songs)
        console.log(this.songList)
      })
    }
  },
  created () {
    this.id = this.$route.params.id
    this._getListDetail()
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
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
  background var(--bg)
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
      color var(--c_tet2)
      text-align justify
      font-size $font-size-medium
    .author_avatar
      display block
      width 20px
      height 20px
      margin-right 10px
      border-radius 100%
    .author_name
      font-size $font-size-small
      color var(--c_tet2)
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
      .play_all
        flex 1
        display flex
        align-items center
        justify-content flex-start
        .play_all_text
          width 100px
          margin-left 10px
          font-size $font-size-medium
          color var(--color)
          no-wrap()
        .play_all_icon
          display: flex
          align-items center
          justify-content center
          width 34px
          height 34px
          border-radius 100%
          background #31c27c
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
      .collect
        height 55px
        display flex
        align-items center
        font-size $font-size-small
        color var(--color)
.music-list
  overflow hidden
  .music-item
    position relative
    padding 10px 16px
    overflow hidden
    color var(--color)
    &.active
      color var(--theme_color)
    .item-box
      width 100%
      display flex
      flex-direction column
      align-items flex-start
      overflow hidden
      .list-tit
        font-size $font-size-large
        color inherit
        line-height 24px
        width 100%
      .list-desc
        max-width 95%
        overflow hidden
        font-size $font-size-small
        line-height 18px
      .list-txt
        display block
        no-wrap()
</style>
