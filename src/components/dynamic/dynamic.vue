<template>
  <div class="appLoading">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>
</template>

<script>
export default {
  name: 'dynamic'
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .appLoading
    position absolute
    top 0
    right 0
    height 30px
    transform translate(0, -50%)
    display flex
    align-items flex-end
    & div
      background-color $color-theme
      width 2px
      height 30px
      border-radius 2px
      margin 2px
      animation-fill-mode both
      animation line-scale-pulse-out 0.9s -0.6s infinite cubic-bezier(0.85, 0.25, 0.37, 0.85)
    & div:nth-child(2), & div:nth-child(4)
      animation-delay -0.6s !important;
    & div:nth-child(1), & div:nth-child(3)
      animation-delay -0.2s !important;

  @keyframes line-scale-pulse-out
    0%
      height 24px
      transition height
    50%
      height 10px
      transition height
    100%
      height 24px
      transition height

</style>
