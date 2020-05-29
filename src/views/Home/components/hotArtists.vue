<template>
  <div class="hot_artists" @click="handleAlert">
    <div class="container animate">
      <div class="background">
        <div class="slider_wrapper">
          <div class="artists_item"
               v-for="(item,index) in topArtists"
               :key="item.id"
               :style="sliderStylue(index)"
          >
            <img
              class="artists_img"
              decoding="async"
              loading="lazy"
              importance="low"
              :style="imgSize(index)"
              :src="`${item.picUrl}?param=100y100`"
            >
            <p class="avatar_name">{{item.name}}</p>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getTopArtists } from '@/api'
import { getImgUrl } from '@/utils/format'

export default {
  name: 'hotArtists',
  data () {
    return {
      topArtists: []
    }
  },
  filters: {
    _getImgUrl (url, w, h) {
      return getImgUrl(url, w, h)
    }
  },
  methods: {
    handleAlert () {
      this.$youToast('等等哟，小柚还在努力编码中...')
      // this.$Alert.info({
      //   content: '等等，过两天再来看看吧~'
      // })
    },
    sliderStylue (index) {
      const top = index % 3
      return `width: 50px;
      height: 100px;
      left: ${50 * index}px;
      top: ${50 * top + 24}px;
      animation-delay: ${3000 * top - 115322}ms`
    },
    imgSize (index) {
      const scale = this._getRandomNumberByRange(8, 12) / 10
      return `width: ${50 * scale}px; height: ${50 * scale}px;`
    },
    _getRandomNumberByRange (start, end) {
      return Math.floor(Math.random() * (end - start) + start)
    },
    _getTopArtists () {
      const data = {
        limit: 100
      }
      getTopArtists(data).then(res => {
        this.topArtists = res.artists
      })
    }
  },
  created () {
    this._getTopArtists()
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .hot_artists
    margin 0 auto
    overflow hidden
    display flex
    justify-content center
    align-items center
  .container
    position relative
    transform none
    user-select none
  .background
    white-space nowrap
    overflow hidden
  .slider_wrapper
    width 2000px
    height 200px
    position relative
    left 50px
  .artists_item
    position absolute
    object-position center center
    pointer-events none
    image-rendering optimizespeed
    animation-name slider_moving
    animation-duration 400s
    animation-timing-function linear
    animation-iteration-count infinite // 无限次播放
  .artists_img
    width 44px
    height 44px
    box-shadow 0 5px 10px rgba(0, 0, 0, 0.32)
    border-radius 50%
  .avatar_name
    text-align center
    line-height 18px
    font-size $font-size-small
    color var(--c_txt2)

  @keyframes slider_moving
    0%
      transform: translateX(2000px)
    to
      transform translateX(-2000px)
</style>
