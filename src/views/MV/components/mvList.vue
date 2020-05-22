<template>
  <ul class="mv_list">
    <li class="mv_item" v-for="simiMv in mvList" :key="simiMv.id">
      <div class="mv_media">
        <img class="media_img" v-lazy="simiMv.cover"/>
      </div>
      <div class="mv_item_contnet">
        <h3 class="mv_item_tit c_txt1">{{simiMv.name}}</h3>
        <p class="mv_item_desc c_txt2">来自 {{simiMv.artistName}}</p>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'mvList',
  props: {
    mvList: Array
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .mv_list
    margin 0 16px 30px
    overflow hidden
    .mv_item
      padding 6px 0
      display flex
      .mv_media
        position relative
        margin-right 12px
        width 120px
        box-sizing border-box
        border-radius 6px
        overflow hidden
        &:before
          content ''
          padding-bottom 56.267%
        .media_img
          width 100%
          height 100%
    .mv_item_contnet
      flex 1
      display flex
      flex-direction column
      justify-content space-between
      padding 6px 0
      .mv_item_tit
        font-size $font-size-large
        line-height 18px
        no-wrap-number(2)
      .mv_item_desc
        font-size $font-size-small
        no-wrap()
</style>
