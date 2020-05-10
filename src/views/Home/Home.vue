<template>
  <div class="home">
    <div class="top-header">
      <h2 class="top-title">音乐馆</h2>
      <div class="search-box">
        <search></search>
      </div>
      <i class="iconfont iconmusic"></i>
    </div>
    <banner :banner-list="bannerList" @click="handleToggleTheme"></banner>
    <content-view></content-view>
    <tab-nav></tab-nav>
  </div>
</template>

<script>
import tabNav from '@/components/tabNav/tabNav'
import banner from '@/views/Home/components/banner'
import search from '@/views/Home/components/search'
import contentView from '@/views/Home/components/contentView'
import { getBanner } from '@/api'
export default {
  name: 'Home',
  components: {
    tabNav,
    banner,
    search,
    contentView
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
    .top-header
      display flex
      justify-content space-between
      align-items center
      padding 0 10px
      box-sizing border-box
      .top-title
        font-size $font-size-large-m
        color var(--color)
        font-weight bold
      .iconmusic
        font-size 22px
        font-weight bold
        color var(--theme_color)
      .search-box
        flex 1
</style>
