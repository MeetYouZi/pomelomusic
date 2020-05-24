<template>
  <div class="rank_list">
    <div class="rank_title">官方榜</div>
    <ul class="rank_list_top">
      <li class="rank_list_item"
          v-for="(item) in topList"
          :key="item.id"
          @click="handleToDetail(item.id)"
      >
        <div class="ank_list_left">
          <h2 class="rank_list_tit">{{item.name}}</h2>
          <ol class="rank_song_list">
            <li class="rank_song_list_item" v-for="(sing, index) in item.tracks" :key="index">
              <strong>{{index + 1}}.</strong>
              {{sing.first}}-{{sing.second}}
            </li>
          </ol>
        </div>
        <div class="rank_list_media">
          <img class="rank_list_img" v-lazy="`${item.coverImgUrl}?param=200y200`">
        </div>
      </li>
    </ul>
    <div class="rank_title">全球榜</div>
    <ul class="rank_list_global">
      <li class="rank_global_item"
          v-for="item in globalTopList"
          :key="item.id"
          @click="handleToDetail(item.id)"
      >
        <div class="rank_global_coverImgUrl">
          <img class="rank_global_img" v-lazy="item.coverImgUrl"/>
        </div>
        <p class="rank_global_name">{{item.name}}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import { getToplist } from '@/api'
export default {
  name: 'Recommend',
  data () {
    return {
      topList: [],
      globalTopList: []
    }
  },
  methods: {
    handleToDetail (id) {
      this.$router.push(`/musicList/${id}`)
    },
    _formatToplist (obj) {
      return {
        name: obj.name,
        tracks: obj.artists,
        coverImgUrl: obj.coverUrl
      }
    },
    _getToplist () {
      getToplist().then(res => {
        // this.topList = res.list
        this.topList = res.list.filter(item => {
          if (item.ToplistType) {
            return item
          }
        })
        this.globalTopList = res.list.filter(item => {
          if (!item.ToplistType) {
            return item
          }
        })
        // const artistToplist = this._formatToplist(res.artistToplist)
        // this.topList.push(artistToplist)
      })
    }
  },
  created () {
    this._getToplist()
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  >>>strong
    font-weight bold
  .rank_list
    padding-top 10px
    background var(--theme)
    .rank_title
      font-size $font-size-large
      font-weight bold
      padding 0 0 10px 16px
      color var(--color)
    .rank_list_top
      margin-bottom 20px
    .rank_list_item
      display flex
      align-items center
      margin 0 16px 12px
      border-radius 8px 0 0 8px
      background var(--searchBg)
      .ank_list_left
        flex 1
        overflow hidden
        .rank_list_tit
          margin 0 12px 4px 12px
          line-height 22px
          font-size 16px
          font-weight 700
          color var(--color)
        .rank_song_list
          position relative
          .rank_song_list_item
            margin 0 12px 4px
            line-height 16px
            color var(--c_txt3)
            no-wrap()
      .rank_list_media
        position relative
        width 107px
        height 107px
        overflow hidden
        border-radius 0 8px 8px 0
        &:before
          content ''
          position absolute
          left 0
          top 0
          width 100%
          height 100%
          background hsla(0, 0, 0, 0.5)
          filter blur(20px)
          z-index 1
        .rank_list_img
          display block
          width 100%
          height 100%
          object-fit cover
    .rank_list_global
      margin 0 16px 12px
      overflow hidden
    .rank_global_item
      float left
      width 33.3%
      padding 0 5px
      margin-bottom 8px
      box-sizing border-box
      overflow hidden
      &:nth-child(3n + 1)
        padding-left 0px
      &:nth-child(3n)
        padding-right 0px
      .rank_global_name
        no-wrap()
        padding 6px 0
        color var(--c_txt1)
      .rank_global_coverImgUrl
        width 100%
        height 107px
        border-radius 6px
        overflow hidden
        position relative
        &:before
          content ''
          position absolute
          left 0
          top 0
          width 100%
          height 100%
          background hsla(0, 0, 0, 0.3)
          filter blur(10px)
          z-index 1
        .rank_global_img
          width 100%
          height 107px
</style>
