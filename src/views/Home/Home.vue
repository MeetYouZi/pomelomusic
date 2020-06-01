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
      <div class="fixed">
        <div class="cancel" @click.stop="handelCancel" v-show="showSearchView">取消</div>
        <transition name="fade">
          <i v-show="!showSearchView && !playing" class="iconfont iconmusic fade"></i>
        </transition>
        <transition name="fade">
          <div
            class="dynamic fade"
            v-show="!showSearchView && playing"
            @click="handleToUrl"
          >
            <dynamic></dynamic>
          </div>
        </transition>
      </div>
    </div>
    <search-view
      ref="searchView"
      :showSearchView="showSearchView"
      :keyWord="keyWord"
    ></search-view>
    <banner :banner-list="bannerList"></banner>
    <hot-artists></hot-artists>
    <content-view></content-view>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import banner from '@/views/Home/components/banner'
import search from '@/views/Home/components/search'
import contentView from '@/views/Home/components/contentView'
import searchView from '@/views/Home/components/searchView'
import dynamic from '@/components/dynamic/dynamic'
import hotArtists from '@/views/Home/components/hotArtists'
import { getBanner } from '@/api'
export default {
  name: 'Home',
  components: {
    banner,
    search,
    dynamic,
    contentView,
    searchView,
    hotArtists
  },
  computed: {
    ...mapGetters(['playing', 'currentSong'])
  },
  data () {
    return {
      bannerList: [],
      showSearchView: false,
      isBlack: true,
      keyWord: ''
    }
  },
  methods: {
    // 切换主题
    handleToggleTheme () {
      this.isBlack = !this.isBlack
      document.querySelector('html').className = this.isBlack ? 'black' : 'white'
      localStorage.setItem('pomelomusic_themeBg', document.querySelector('html').className)
    },
    keyWordChange (newValue) {
      this.keyWord = newValue.trim()
    },
    handleToUrl () {
      this.$router.push(`/playSong/${this.currentSong.id}`)
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
    padding-top 56px
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
      .fixed
        min-width 22px
        position relative
        text-align right
      .dynamic
        width 22px
        position absolute
      .cancel
        font-size $font-size-medium
        color var(--color)
      .top-title
        padding-left 16px
        font-size $font-size-large-m
        color var(--color)
        font-weight bold
      .iconmusic
        position absolute
        top 50%
        left 50%
        transform translate(-50%, -50%)
        font-size 22px
        font-weight bold
        color var(--theme_color)
      .search-box
        flex 1
</style>
