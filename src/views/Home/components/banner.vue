<template>
  <transition name="fade">
    <div class="music-banner fade" v-if="bannerList.length">
      <img :src="bannerList[0].imageUrl"/>
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
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.music-banner
  width 100%
  height 154px
  img
    width 100%
    height 100%
</style>
