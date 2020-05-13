<template>
  <div class="search_bar">
    <i class="iconfont iconsearch"></i>
    <input type="search" v-model="query" @focus="handelFocus" @blur="handleBlue" class="search_bar__input c_input" placeholder="搜索"/>
  </div>
</template>

<script>
export default {
  name: 'search',
  data () {
    return {
      query: ''
    }
  },
  methods: {
    handelFocus () {
      this.$emit('handelFocus', true)
    },
    handleBlue () {
      this.$emit('handelFocus', false)
    }
  }
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
  background var(--searchBg)
  transition width all .3s
  .iconsearch
    position absolute
    left 50%
    top 50%
    transform translate(-0, -50%)
    margin-left -26px
    color  var(--searchcolor)
    vertical-align top
  .search_bar__input
    position: absolute
    top: 0
    left: 0
    width: 100%
    padding-top: 6px
    padding-bottom: 4px
    padding-left: 24px
    font-size: $font-size-medium
    text-align: center
    border: none
    border-radius: 0
    background: 0 0
    -webkit-appearance: none
    &.c_input
       color var(--searchcolor)
</style>
