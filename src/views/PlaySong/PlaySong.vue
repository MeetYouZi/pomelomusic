<template>
  <div class="song_wrap">
    <div class="main">
      <div class="main_wrap">
        <div class="song_info">
          <h1 class="song_name">{{currentSong.name}}</h1>
          <h1 class="sing_name">{{currentSong.singer}}{{lyricIndex}}</h1>
        </div>
        <div class="lyric_info">
          <div class="song_info_lyric" ref="musicLyric">
            <ul class="lyric">
              <li
                class="lyric_item"
                v-for="(i, index) in lyric"
                :style="lyricTop"
                :class="{active:lyricIndex===index}"
              >
                {{i.text}}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="bg">
      <img class="bg_img" :src="currentSong.image">
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { getLyricl, getSongDetail } from '@/api'
import { parseLyric } from '@/utils/lyric'
import formatSongs from '@/utils/song'
const MARGINTOP = 0
export default {
  name: 'PlaySong',
  data () {
    return {
      lyric: [],
      lyricIndex: 0,
      top: 0
    }
  },
  watch: {
    currentTime (newTime) {
      if (this.nolyric) {
        return
      }
      let lyricIndex = 0
      for (let i = 0; i < this.lyric.length; i++) {
        if (newTime > this.lyric[i].time) {
          lyricIndex = i
        }
      }
      this.lyricIndex = lyricIndex
    }
  },
  computed: {
    ...mapGetters(['currentTime', 'currentSong']),
    lyricTop () {
      return `transform :translate3d(0, ${-34 *
      (this.lyricIndex - this.top)}px, 0)`
    }
  },
  methods: {
    // 获取歌词
    _getLyric (id) {
      getLyricl(id).then(res => {
        this.lyric = parseLyric(res.lrc.lyric)
        console.log(this.lyric, 'this.lyric')
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
        // setTimeout(() => {
          this.selectPlay({
            list: this.songList,
            index: 0
          // }, 1000)
        })
        console.log(res)
      })
    },
    ...mapActions(['selectPlay'])
  },
  mounted () {
    const id = this.$route.params.id
    this._getSongDetail(id)
    this._getLyric(id)
    const dom = this.$refs.musicLyric
    const height = dom.offsetHeight
    this.top = Math.floor(height / 34 / 2)
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.song_wrap
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
        margin-top 20px
      .sing_name
        margin 0 20px 15px
        text-align center
        no-wrap()
        font-size $font-size-medium
      .lyric_info
        position relative
        height 165px
      .song_info_lyric
        position absolute
        top 0
        right 0
        bottom 0
        left 0
        z-index 1
        display flex
        align-items center
        opacity 1
        .lyric
          width 100%
          height 160px
          margin-top 15px
          overflow hidden
          .lyric_item
            line-height 34px
            text-align center
            color $color-text
            &.active
              color $color-theme
  .bg
    position absolute
    top 0
    left 0
    z-index 1
    width 100%
    .bg_img
      position absolute
      top 0
      left 0
      z-index 2
      width 100%
      opacity .06
      // transform scale(1.2)
</style>
