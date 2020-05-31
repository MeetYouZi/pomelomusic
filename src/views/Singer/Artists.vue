<template>
  <div class="artists_detail">
    <div class="artists_top">
      <img class="top_bg" v-lazy="artist.picUrl"/>
      <div class="top_cont">
        <div class="top_tit">
          <h3 class="top_tit_name">{{artist.name}}</h3>
        </div>
        <div class="top_other">
          <p class="top_other_txt">{{artist.briefDesc}}</p>
        </div>
      </div>
    </div>
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
      <p class="play_all_text">{{!playing ? '一键播放' : currentSong.name}}</p>
    </div>
    <div class="artists_hotSongs">
      <music-list :songList="hotSongs" @selectItem="selectItem"></music-list>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import { getArtistsSong } from '@/api'
import ProgressCircle from '@/components/progress/progressCircle'
import musicList from '@/components/musicList/musicList'
import formatSongs from '@/utils/song'
import { SET_PLAY } from '@/assets/js/mixin'
import { SET_PLAYINGSTATE } from '@/store/mutation-types'
export default {
  name: 'artists',
  components: {
    musicList,
    ProgressCircle
  },
  mixins: [SET_PLAY],
  computed: {
    ...mapGetters(['playing', 'currentSong', 'playing'])
  },
  data () {
    return {
      artist: {},
      hotSongs: []
    }
  },
  methods: {
    // 选择播放事件
    selectItem (item, index) {
      this.selectPlay({
        list: this.hotSongs,
        index
      })
      this.$router.push(`/playSong/${item.id}`)
    },
    togglePalying () {
      if (!this.playing) {
        const index = 0
        this.selectPlay({
          list: this.hotSongs,
          index
        })
      } else {
        this.setPlayState(!this.playing)
      }
    },
    ...mapActions(['selectPlay']),
    ...mapMutations({
      setPlayState: SET_PLAYINGSTATE
    }),
    _getArtistsSong () {
      const data = {
        id: this.$route.params.id
      }
      getArtistsSong(data).then(res => {
        this.artist = res.artist
        this.hotSongs = formatSongs(res.hotSongs)
      })
    }
  },
  created () {
    this._getArtistsSong()
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.artists_detail
  position relative
  background var(--color_white)
  z-index 11
  .artists_top
    position relative
    overflow hidden
    border-bottom-left-radius 25px
    border-bottom-right-radius 25px
    .top_bg
      position absolute
      top 0
      left 0
      width 100%
      height 100%
      object-fit cover
      object-position center
    &:before
      content ""
      display block
      padding-top 75%
    .top_cont
      position absolute
      bottom 15px
      left 0
      z-index 2
      padding 0 16px
      width 100%
      box-sizing border-box
      .top_tit
        margin-bottom 4px
        .top_tit_name
          font-size 25px
          font-weight 500
          line-height 1.4
          color $color-text-f
          no-wrap()
      .top_other
        margin 2px
        .top_other_txt
          color $color-text-f
          line-height 20px
          font-size $font-size-medium
          no-wrap()
  .play_all
    position relative
    display flex
    align-items center
    margin 20px 16px 8px
    font-size $font-size-medium-m
    .progressBox
      position absolute
      width 34px
      height 34px
    .play_all_text
      flex 1
      margin-left 10px
      line-height 1.5
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
  .artists_hotSongs
    position relative
</style>
