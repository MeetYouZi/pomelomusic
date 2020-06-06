<template>
  <transition name="fade">
    <div class="searchView" v-show="showSearchView">
      <div class="hot_search" v-show="hotKey.length && !searchMusicList.length">
        <h1 class="hot_search_title color1">历史搜索</h1>
        <div
          class="hot_search_delete color1"
          @click="handelDelsHistorys"
        >
          <i class="iconfont icondel1"></i>
        </div>
        <ul class="hot_search_list">
          <li @click="searchMusic(item)" class="hot_search_history_item c_txt1 hot_search_item_bg2" v-for="(item,index) in hotKey" :key="index">
            {{item}}
          </li>
        </ul>
      </div>
      <div class="hot_search" v-show="searchHots.length && !searchMusicList.length">
        <h1 class="hot_search_title color1">热搜榜</h1>
<!--        <div class="hot_search_delete color1"><i class="iconfont iconclose"></i> </div>-->
        <ul class="hot_search_list">
          <li @click="searchMusic(item.searchWord)" class="hot_search_item c_txt1" v-for="(item,index) in searchHots" :key="index">
            <div class="search_item_sort" :class="index < 4 ? 'colorTheme' : ''">{{index + 1}}</div>
            <div class="search_item_content">
              <div class="search_item_name">
                <div class="hotKey c_txt1">{{item.searchWord}}</div>
                <div class="hotTag" v-show="item.iconType == 1">hot</div>
              </div>
              <p class="search_item_desc">{{item.content}}</p>
            </div>
          </li>
        </ul>
      </div>
      <div class="search_list" v-show="searchMusicList.length">
        <search-list
          :song-list="searchMusicList"
          @selectItem="handleSelectSong"
        ></search-list>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import { getSearchHot, searchMusic } from '@/api'
import { SET_SEARCHHISTORYS } from '@/store/mutation-types'
import searchList from './searchList'
import { createSongList } from '@/utils/song'
const SEARCH_MAX_LEN = 10
export default {
  name: 'searchView',
  components: {
    searchList
  },
  props: {
    showSearchView: Boolean,
    keyWord: {
      type: String,
      default: ''
    }
  },
  watch: {
    keyWord (newQuery) {
      if (!newQuery) {
        setTimeout(() => {
          this.searchMusicList = []
        }, 20)
      } else {
        setTimeout(() => {
          this.searchMusic(newQuery)
        }, 500)
      }
    }
  },
  computed: {
    hotKey () {
      return this.searchHistorys
    },
    ...mapGetters(['searchHistorys'])
  },
  data () {
    return {
      searchHots: [],
      searchMusicList: []
    }
  },
  methods: {
    handelDelsHistorys () {
      this.set_searchHistory([])
    },
    insertArray (arr, val, compare, maxLen) {
      const index = arr.findIndex(compare)
      if (index === 0) {
        return
      }
      if (index > 0) {
        arr.splice(index, 1)
      }
      arr.unshift(val)
      if (maxLen && arr.length > maxLen) {
        arr.pop()
      }
    },
    handleSelectSong (item, index) {
      // const songList = [item]
      this.saveSearch(item.name)
      this.selectPlay({
        list: this.searchMusicList,
        index: index
      })
      this.$router.push(`/playSong/${item.id}`)
    },
    ...mapActions(['selectPlay']),
    saveSearch (query) {
      const searches = JSON.parse(JSON.stringify(this.hotKey))
      this.insertArray(searches, query, (item) => {
        return item === query
      }, SEARCH_MAX_LEN)
      this.set_searchHistory(searches)
      return searches
    },
    addQuery () {

    },
    filterSinger (singers) {
      const arr = []
      singers.forEach(item => {
        arr.push(item.name)
      })
      return arr.join('/')
    },
    createSong (music) {
      const { id, name, img, artists, duration } = music
      return {
        id,
        name,
        imgage: img,
        artists,
        singer: music.artists && music.artists.length > 0 && this.filterSinger(music.artists),
        album: music.album.name,
        duration: duration / 1000,
        url: `https://music.163.com/song/media/outer/url?id=${music.id}.mp3`
      }
    },
    formatSongs (list) {
      const Songs = []
      list.forEach(item => {
        const musicData = item
        if (musicData.id) {
          Songs.push(this.createSong(musicData))
        }
      })
      return Songs
    },
    searchMusic (keywords) {
      const data = {
        keywords
      }
      searchMusic(data).then(res => {
        this.searchMusicList = this.formatSongs(res.result.songs)
      })
    },
    _getSearchHot () {
      getSearchHot().then(res => {
        this.searchHots = res.data
      })
    },
    ...mapMutations({
      set_searchHistory: SET_SEARCHHISTORYS
    })
  },
  created () {
    // this.hotKey = this.searchHistorys
    this._getSearchHot()
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .searchView
    position fixed
    top 40px
    right 0
    width 100%
    height 100%
    bottom 0
    z-index 20
    background var(--theme)
    overflow scroll
    padding-bottom 40px
    box-sizing border-box
    &.fade-enter, &.fade-leave-active
      opacity: 0
    &.fade-enter-active, &.fade-leave-active
      transition: all 0.3s ease-in-out
  .hot_search
    position relative
    margin-top 16px
    .hot_search_title
      margin 16px 16px 12px
      font-size $font-size-medium
      font-weight 700
    .hot_search_delete
      position absolute
      top 0
      right 16px
      color var(--c_txt2)
      .iconfont
        font-size 14px
    .hot_search_list
      margin 0 16px
      overflow hidden
      .hot_search_item
        float left
        width 50%
        display flex
        align-items center
        justify-content flex-start
        margin-bottom 26px
        box-sizing border-box
        overflow hidden
        &:nth-child(2n+1)
          padding-right 6px
        &:nth-child(2n)
          padding-left 6px
        .search_item_sort
          min-width 10px
          font-size $font-size-medium
          font-weight bold
          padding-right 10px
          vertical-align center
          text-align right
        .search_item_content
          flex 1
          overflow hidden
          .search_item_name
            display flex
            margin-bottom 6px
            vertical-align top
            line-height 20px
            .hotKey
              font-weight bold
              font-size $font-size-medium
              no-wrap()
            .hotTag
              font-weight bold
              padding-left 6px
              color $color-theme
              font-size $font-size-large
              width 50px
          .search_item_desc
            position relative
            font-size $font-size-small
            line-height 14px
            color var(--c_txt2)
            no-wrap()
      .hot_search_history_item
        vertical-align top
        display inline-block
        max-width 212px
        height 24px
        line-height 24px
        margin 0 10px 10px 0
        padding 0 10px
        no-wrap()
        font-size $font-size-small
        border-radius 24px
</style>
