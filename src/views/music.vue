<template>
  <div class="music">
    <keep-alive>
      <router-view class="music-content-view"/>
    </keep-alive>
    <tab-nav></tab-nav>
  </div>
</template>

<script>
import TabNav from '@/components/tabNav/tabNav'
export default {
  name: 'music',
  components: { TabNav }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.music-content-view
  margin-bottom 50px
</style>
