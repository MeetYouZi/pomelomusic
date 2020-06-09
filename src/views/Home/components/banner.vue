<template>
  <transition name="fade">
    <div class="music-banner fade" v-if="bannerList.length" @click="handleTest">
      <swiper :options="swiperOptions">
        <swiper-slide v-for="banner in bannerList" :key="banner.id">
          <img :src="banner.imageUrl"/>
        </swiper-slide>
      </swiper>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'banner',
  props: {
    bannerList: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      swiperOptions: {
        loop: true
      }
    }
  },
  methods: {
    handleTest () {
      this.$message({
        type: 'success',
        content: 'who are you ? I am 小柚',
        duration: 3000
      })
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.music-banner
  height 154px
  margin 0 16px
  border-radius 6px
  overflow hidden
  img
    width 100%
    height 100%
</style>
