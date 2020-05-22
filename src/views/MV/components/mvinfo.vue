<template>
  <div class="tab_cont">
    <div class="mv_info">
      <h1 class="mv_info_title">{{mvInfo.name}}</h1>
      <div class="mv_info_other">
        总播放{{mvInfo.playCount}}次
        {{mvInfo.publishTime | format}}</div>
    </div>
    <div class="mv_author">
      <div class="mv_author_avatar">
        <img class="avatar_img" :src="artistInfo.picUrl"/>
      </div>
      <div class="author_content">
        <h3 class="author_name c_txt1">{{ artistInfo.name }}</h3>
        <p class="author_desc c_txt2">{{artistInfo.briefDesc}}</p>
      </div>
    </div>
    <div class="mv_list">
      <mv-list :mvList="mvList"></mv-list>
    </div>
  </div>
</template>

<script>
import mvList from '@/views/MV/components/mvList'
import { dateFormat } from '@/utils/format'
export default {
  name: 'mvinfo',
  components: {
    mvList
  },
  filters: {
    format (time) {
      const date = new Date(time)
      return dateFormat(date, 'yyyy-MM-dd')
    }
  },
  props: {
    artistInfo: Object,
    mvInfo: Object,
    mvList: Array
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .tab_cont
    background var(--bg)
  .mv_info
    position relative
    margin 0 16px 26px
    padding-top 15px
    .mv_info_title
      margin 0 20px 4px 0
      color var(--c_txt1)
      font-size $font-size-large
      line-height 24px
    .mv_info_other
      color var(--c_txt2)
      font-size $font-size-small
      margin-bottom 6px
      line-height 18px
  .mv_author
    margin-bottom 10px
    padding 0 16px
    display flex
    align-items center
    justify-content space-between
    .mv_author_avatar
      flex 0 0 40px
      width 40px
      height 40px
      border-radius 50%
      overflow hidden
      .avatar_img
        width 100%
        height 100%
    .author_content
      flex 1
      overflow hidden
      padding-left 10px
      .author_name
        font-size $font-size-large
        line-height 18px
        padding-bottom 6px
      .author_desc
        font-size $font-size-small
        no-wrap()
</style>
