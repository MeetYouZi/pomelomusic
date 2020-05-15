<template>
  <div class="song_wrap">
    <div class="main">
      <div class="main_wrap">
        <div class="song_info">
          <h1 class="song_name">{{currentSong.name}}</h1>
          <h1 class="sing_name">{{currentSong.singer}}</h1>
        </div>
        <lyric :lyric="lyric"></lyric>
      </div>
      <div class="opt">
        <div class="opt_item">
          <i class="iconfont iconplay"></i>
        </div>
        <div class="opt_item">
          <i class="iconfont iconpause"></i>
        </div>
        <div class="opt_item">
          <i class="iconfont iconplay"></i>
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
import lyric from '@/views/PlaySong/components/lyric'
const MARGINTOP = 0
export default {
  name: 'PlaySong',
  components: {
    lyric
  },
  data () {
    return {
      lyric: []
    }
  },
  computed: {
    ...mapGetters(['currentTime', 'currentSong'])
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
        line-height 30px
        font-size $font-size-large
      .sing_name
        margin 0 20px 15px
        text-align center
        no-wrap()
        color var(--c_txt2)
        font-size $font-size-medium
    .opt
      display flex
      align-items center
      justify-content center
      height 90px
      margin-top 20px
      .opt_item
        width 38px
        height 38px
        margin 0 20px
        border-radius 50%
        border 1px solid #ccc
        text-align center
        display flex
        align-items center
        justify-content center
        .iconfont
          font-weight bold
          color #000
          line-height 38px
          font-size 20px
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
