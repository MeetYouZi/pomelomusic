<template>
  <div class="home">
    <search></search>
    <banner :banner-list="bannerList" @click="handleToggleTheme"></banner>
    <content-view></content-view>
    <pomelo-play></pomelo-play>
  </div>
</template>

<script>
import banner from '@/views/Home/components/banner'
import search from '@/views/Home/components/search'
import contentView from '@/views/Home/components/contentView'
import pomeloPlay from '@/components/pomeloPlay/pomeloPlay'
import { getBanner } from '@/api'
export default {
  name: 'Home',
  components: {
    banner,
    search,
    contentView,
    pomeloPlay
  },
  data () {
    return {
      bannerList: []
    }
  },
  methods: {
    // 切换主题
    handleToggleTheme () {
      document.querySelector('html').className = 'black'
    },
    _getBanner () {
      getBanner().then(res => {
        this.bannerList = res.banners
      })
    }
  },
  created () {
    this._getBanner()
  }
}
</script>
<style lang="stylus" scoped>
  .home
    background var(--theme)
    position relative
    overflow hidden
</style>
