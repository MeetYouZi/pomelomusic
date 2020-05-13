<template>
  <div class="music">
    <keep-alive>
      <router-view :class="currentSong.id ? 'music-content-view mb100' : 'music-content-view'"/>
    </keep-alive>
    <tab-nav></tab-nav>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import TabNav from '@/components/tabNav/tabNav'
export default {
  name: 'music',
  components: { TabNav },
  computed: {
    ...mapGetters(['currentSong'])
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.music-content-view
  padding-bottom 50px
</style>
