<template>
  <div class="home">
    <div class="top-header">
      <h2
        class="top-title"
        @click="handleToggleTheme"
        v-show="!showSearchView"
      >
        音乐馆
      </h2>
      <div class="search-box">
        <search @handelFocus="handelFocus"></search>
      </div>
      <div class="cancel" v-show="showSearchView">取消</div>
      <i v-show="!showSearchView" class="iconfont iconmusic"></i>
    </div>
    <banner :banner-list="bannerList"></banner>
    <content-view></content-view>
  </div>
</template>

<script>
import banner from '@/views/Home/components/banner'
import search from '@/views/Home/components/search'
import contentView from '@/views/Home/components/contentView'
import { getBanner } from '@/api'
export default {
  name: 'Home',
  components: {
    banner,
    search,
    contentView
  },
  data () {
    return {
      bannerList: [],
      showSearchView: false
    }
  },
  methods: {
    // 切换主题
    handleToggleTheme () {
      document.querySelector('html').className = 'black'
    },
    handelFocus (show) {
      this.showSearchView = show
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
      .cancel
        font-size $font-size-medium
        color var(--color)
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
