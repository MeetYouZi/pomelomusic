<template>
  <div class="song_wrap">
    <div class="bg">
      <img class="bg_img" :src="currentSong.image"/>
    </div>
    <div class="main">
      <div class="main_wrap">
        <div class="song_info">
          <h1 class="song_name">{{currentSong.name}}</h1>
          <h1 class="sing_name">{{currentSong.singer}}</h1>
        </div>
        <div class="imgBox" v-if="nolyric">
          <img class="bg_img_cover" :src="currentSong.image"/>
        </div>
        <lyric :lyric="lyric" :nolyric="nolyric"></lyric>
      </div>
      <div class="play_progress_bar">
        <p>{{currentTime | formatTime}}</p>
        <div class="progress_bar">
          <progress-bar
            :percent="percent"
            @percentChange="percentChange"
          >
          </progress-bar>
        </div>
        <p>{{currentSong.duration | formatTime}}</p>
      </div>
      <div class="opt">
        <div class="opt_item" @click="changeMode">
          <i class="iconfont" :class="iconMode"></i>
        </div>
        <div class="opt_item" @click="prev">
          <i class="iconfont iconshangyiqu101"></i>
        </div>
        <div class="opt_item icon-mini" @click="togglePalying">
          <i
             class="iconfont icon-mini"
             :class="miniIcon"
          ></i>
        </div>
        <div class="opt_item" @click="next">
          <i class="iconfont iconxiayiqu101"></i>
<!--          <icon_like></icon_like>-->
        </div>
        <div class="opt_item" @click="handleShowPlayList">
          <i class="iconfont iconmenuoff"></i>
        </div>
      </div>
    </div>
    <div class="song_comment">
      <h1 class="comment_tit">精彩评论</h1>
      <comment :commentList="commentList" :hotCommentList="hotCommentList"></comment>
    </div>
    <popup-play-list ref="popupPlayList"></popup-play-list>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import { getLyricl, getSongDetail, getCommentList } from '@/api'
import { parseLyric } from '@/utils/lyric'
import formatSongs from '@/utils/song'
import lyric from '@/views/PlaySong/components/lyric'
import comment from '@/components/comment/comment'
import ProgressBar from '@/components/progress/progressBar'
// import icon_like from '@/components/icons/icon_like'
import { SET_PLAYING_TIME, SET_PLAY, SET_PLAY_MODE } from '@/assets/js/mixin'
import { formatTime } from '@/utils/utils'
import popupPlayList from '@/components/popupPlayList/popupPlayList'

const MARGINTOP = 0
export default {
  name: 'PlaySong',
  components: {
    lyric,
    comment,
    ProgressBar,
    popupPlayList
    // icon_like
  },
  mixins: [SET_PLAYING_TIME, SET_PLAY, SET_PLAY_MODE],
  data () {
    return {
      lyric: [],
      commentList: [],
      hotCommentList: [],
      nolyric: false
    }
  },
  computed: {
    ...mapGetters(['currentTime', 'currentSong', 'playing', 'currentIndex', 'playList']),
    miniIcon () {
      return this.playing ? 'iconpause1' : 'iconplay'
    }
  },
  filters: {
    // 时间格式化
    formatTime
  },
  watch: {
    currentSong (newValue, oldValue) {
      if (!newValue.id) {
        this.lyric = []
        return
      }
      if (newValue.id === oldValue.id) {
        return
      }
      this.$nextTick(() => {
        document.title = newValue.name
        this._getLyric(newValue.id)
        this._getCommentList(newValue.id)
      })
    }
  },
  methods: {
    togglePalying () {
      this.setPlayState(!this.playing)
    },
    handleShowPlayList () {
      this.$refs.popupPlayList.isShow()
    },
    next () {
      const playListLength = this.playList.length
      if (playListLength === 1) {
        // return this.loop()
      }
      let index = 0
      if (this.currentIndex === this.playList.length - 1) {
        index = 0
      } else {
        index = this.currentIndex + 1
      }
      this.setCurrentIndex(index)
      if (!this.playing) {
        this.togglePlaying()
      }
    },
    prev () {
      let index = this.currentIndex - 1
      if (index === -1) {
        index = this.playList.length - 1
      }
      this.setCurrentIndex(index)
      if (!this.playing) {
        this.togglePlaying()
      }
    },
    ...mapMutations({
      setCurrentIndex: 'SET_CURRENTINDEX',
      setPlayState: 'SET_PLAYINGSTATE'
    }),
    isplaying (list) {
      const index = list.findIndex((item) => {
        return item.id === this.currentSong.id
      })
      return index > -1
    },
    // 获取歌词
    _getLyric (id) {
      getLyricl(id).then(res => {
        if (res.nolyric) {
          this.nolyric = true
        } else {
          this.nolyric = false
          this.lyric = parseLyric(res.lrc.lyric)
        }
        // silencePromise(this.audioEle.play())
      })
    },
    _getSongDetail (id) {
      getSongDetail(id).then(res => {
        this.songList = formatSongs(res.songs)
        document.title = this.currentSong.name
        if (!this.isplaying(this.songList)) {
          this.selectPlay({
            list: this.songList,
            index: 0
          })
        }
        // setTimeout(() => {
        //   this.selectPlay({
        //     list: this.songList,
        //     index: 0
        // }, 1000)
        // })
      })
    },
    _getCommentList (id) {
      getCommentList(id).then(res => {
        this.commentList = res.comments
        this.hotCommentList = res.hotComments
      })
    },
    ...mapActions(['selectPlay'])
  },
  created () {
    const id = this.$route.params.id
    this._getSongDetail(id)
    this._getLyric(id)
    this._getCommentList(id)
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.song_wrap
  z-index 20
  background var(--theme)
  .main
    position relative
    padding-bottom 15px
    overflow hidden
    .main_wrap
      position relative
      z-index 4
      .song_info
        position relative
      .song_name
        display flex
        align-items center
        justify-content center
        margin-top 10px
        line-height 30px
        color var(--c_txt1)
        font-size $font-size-large
        text-align center
      .sing_name
        margin 0 20px 15px
        text-align center
        no-wrap()
        color var(--c_txt2)
        font-size $font-size-medium
      .imgBox
        width 100%
        height 165px
        display flex
        align-items center
        justify-content center
        .bg_img_cover
          width 140px
          height 140px
          border-radius 6px
          box-shadow 0 0 20px 0 rgba(0,0,0,.1)
    .play_progress_bar
      margin-top 50px
      padding 0px 16px
      box-sizing border-box
      display flex
      align-items center
      justify-content space-between
      p
        color var(--c_txt2)
        font-size $font-size-small
        width 40px
        text-align center
        padding 0 6px
      .progress_bar
        flex 1
    .opt
      display flex
      align-items center
      justify-content center
      height 70px
      .opt_item
        width 38px
        height 38px
        margin 0 12px
        border-radius 50%
        text-align center
        display flex
        align-items center
        justify-content center
        &.icon-mini
          border 1px solid var(--c_txt1)
        .iconfont
          color var(--c_txt1)
          font-weight bold
          line-height 38px
          font-size 20px
  .song_comment
    position relative
    padding 0 16px
    box-sizing border-box
    .comment_tit
      height 55px
      font-size $font-size-large-m
      font-weight 400
      text-align center
      line-height 55px
      color var(--c_txt1)
  .bg
    position absolute
    top 0
    left 0
    width 100%
    height 100%
    overflow hidden
    .bg_img
      position absolute
      top 0
      left 0
      width 100%
      opacity 0.2
      filter blur(4px)
      transform scale(1.2)
      mask-image linear-gradient(180deg,hsla(0,0%,100%,0) 0,
      hsla(0,0%,100%,1) 15%,#fff 25%,#fff 65%,hsla(0,0%,100%,.8) 100%,hsla(0,0%,100%,0))
</style>
