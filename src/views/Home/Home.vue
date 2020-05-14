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
        <search
          @handelFocus="handelFocus"
          ref="searchBar"
          @keyWordChange="keyWordChange"
        ></search>
      </div>
      <div class="cancel" @click.stop="handelCancel" v-show="showSearchView">取消</div>
      <i v-show="!showSearchView" class="iconfont iconmusic"></i>
    </div>
    <search-view
      ref="searchView"
      :showSearchView="showSearchView"
      :keyWord="keyWord"
    ></search-view>
    <banner :banner-list="bannerList"></banner>
    <content-view></content-view>
  </div>
</template>

<script>
import banner from '@/views/Home/components/banner'
import search from '@/views/Home/components/search'
import contentView from '@/views/Home/components/contentView'
import searchView from '@/views/Home/components/searchView'
import { getBanner } from '@/api'
export default {
  name: 'Home',
  components: {
    banner,
    search,
    contentView,
    searchView
  },
  data () {
    return {
      bannerList: [],
      showSearchView: false,
      isBlack: false,
      keyWord: ''
    }
  },
  methods: {
    // 切换主题
    handleToggleTheme () {
      this.isBlack = !this.isBlack
      document.querySelector('html').className = this.isBlack ? 'black' : 'white'
    },
    keyWordChange (newValue) {
      this.keyWord = newValue.trim()
    },
    handelCancel () {
      this.$refs.searchBar.query = ''
      this.$refs.searchView.searchMusicList = []
      this.$refs.searchBar.handleBlue()
      this.showSearchView = false
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
    padding-top 40px
    box-sizing border-box
    .top-header
      position fixed
      top 0
      left 0
      width 100%
      display flex
      justify-content space-between
      align-items center
      padding-right 16px
      box-sizing border-box
      background var(--theme)
      z-index 1
      .cancel
        font-size $font-size-medium
        color var(--color)
      .top-title
        padding-left 16px
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
