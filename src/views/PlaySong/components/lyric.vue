<template>
  <div class="lyric_info">
    <div class="song_info_lyric" ref="musicLyric">
      <ul class="lyric">
        <li
          class="lyric_item"
          v-for="(i, index) in lyric"
          :key="index"
          :style="lyricTop"
          :class="{ active:lyricIndex===index }"
        >
          {{ i.text }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { prefixStyle } from '@/assets/js/dom'
const transform = prefixStyle('transform')
const lyricLineHight = 28
export default {
  name: 'lyric',
  props: {
    lyric: Array
  },
  computed: {
    ...mapGetters(['currentTime']),
    lyricTop () {
      return `${transform}: translate3d(0, -${(this.lyricIndex - this.top) * lyricLineHight}px, 0)`
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
  data () {
    return {
      lyricIndex: 0,
      top: 0
    }
  },
  mounted () {
    const height = this.$refs.musicLyric.offsetHeight
    this.top = Math.floor(height / lyricLineHight / 2)
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
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
      // box-shadow 0px 0px 0px #f2f2f2,   /*左边阴影*/
      // 0px -20px 10px #f2f2f2 inset,  /*上边阴影*/
      // 0px 0px 0px #f2f2f2,  /*右边阴影*/
      // 0px 20px 10px #f2f2f2 inset /*下边阴影*/
      .lyric_item
        line-height 28px
        text-align center
        color var(--c_txt2)
        no-wrap()
        transition all .3s
        &.active
          color $color-theme
</style>
