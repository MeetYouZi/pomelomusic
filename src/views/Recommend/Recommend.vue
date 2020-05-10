<template>
  <div class="rank_list">
    <ul>
      <li class="rank_list_item" v-for="(item) in topList" :key="item.id">
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
          <img class="rank_list_img" :src="`${item.coverImgUrl}?param=300y300`">
        </div>
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
      topList: []
    }
  },
  methods: {
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
        const artistToplist = this._formatToplist(res.artistToplist)
        this.topList.push(artistToplist)
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
    margin-top 20px
    .rank_list_item
      display flex
      align-items center
      margin 0 16px 12px
      border-radius 8px 0 0 8px
      .ank_list_left
        flex 1
        overflow hidden
        .rank_list_tit
          margin 0 12px 4px 12px
          line-height 22px
          font-size 16px
          font-weight 700
        .rank_song_list
          position relative
          .rank_song_list_item
            margin: 0 12px 4px
            line-height: 16px
            no-wrap()
      .rank_list_media
        position relative
        width 107px
        height 107px
        overflow hidden
        border-radius 0 8px 8px 0
        .rank_list_img
          display block
          width 100%
          height 100%
          object-fit cover
</style>
