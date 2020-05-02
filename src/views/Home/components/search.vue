<template>
  <div class="search_bar">
    <i class="iconfont iconsearch"></i>
    <input type="search" value="" class="search_bar__input c_input" placeholder="搜索"/>
  </div>
</template>

<script>
export default {
  name: 'search'
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.search_bar
  height 30px
  display flex
  position relative
  margin 8px 10px
  overflow hidden
  border-radius (@height / 2)
  background #fff
  .iconsearch
    position absolute
    left 50%
    top 50%
    transform translate(-0, -50%)
    margin-left -26px
    color $color-text-d
  .search_bar__input
    position: absolute
    top: 0
    left: 0
    width: 100%
    padding-top: 5px
    padding-bottom: 4px
    padding-left: 24px
    font-size: $font-size-medium
    text-align: center
    border: none
    border-radius: 0
    background: 0 0
    -webkit-appearance: none
    &.c_input
       color $color-text
</style>
