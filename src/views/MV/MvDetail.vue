<template>
  <div>
    <div class="mvplayer">
      <video :src="mvUrl" controls="controls"></video>
    </div>
    <div class="mv_tab">
      <div class="tab_item">
        <span class="tab_text">详情</span>
      </div>
      <div class="tab_item">
        <span class="tab_text">评论</span>
      </div>
    </div>
    <div class="tab_cont">
      <div class="mv_info">
        <h1 class="mv_info_author">{{mvInfo.name}}</h1>
        <div class="mv_info_other">总播放{{mvInfo.playCount}}次 {{mvInfo.publishTime | format}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { getmvdetail, getmvUrl } from '@/api'
import { dateFormat } from '@/utils/format'
export default {
  name: 'MvDetail',
  data () {
    return {
      mvInfo: {},
      mvUrl: ''
    }
  },
  filters: {
    format (time) {
      const date = new Date(time)
      return dateFormat(date, 'yyyy-MM-dd')
    }
  },
  methods: {
    _getmvdetail () {
      const data = {
        mvid: this.$route.params.mvid
      }
      getmvdetail(data).then(res => {
        this.mvInfo = res.data
      })
    },
    _getmvUrl (id) {
      const data = {
        id: this.$route.params.mvid
      }
      getmvUrl(data).then(res => {
        this.mvUrl = res.data.url
      })
    }
  },
  created () {
    this._getmvdetail()
    this._getmvUrl()
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .mvplayer
    position relative
    width 100%
    height 200px
    video
      width 100%
      height 100%
  .mv_tab
    display flex
    align-items center
    justify-content space-between
    height 40px
    line-height 40px
    border-bottom 3px
    .tab_item
      flex 1
      text-align center
      overflow hidden
    .tab_text
      position relative
      text-align center
      height 40px
      padding 4px 4px
      &:after
        content ""
        position absolute
        bottom 0
        left 50%
        width 20px
        height 3px
        border-radius 3px
        margin-left -10px
        background #22d59c
</style>
