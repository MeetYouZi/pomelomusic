<template>
  <transition name="custom-loading-fade">
    <!--loading蒙版-->
    <div v-show="visible" class="custom-loading-mask">
      <!--loading中间的图标-->
      <div class="custom-loading-spinner">
        <i class="custom-spinner-icon"></i>
        <!--loading上面显示的文字-->
        <p class="custom-loading-text">{{ text }}</p>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  data () {
    return {
      text: '',
      visible: false
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.custom-loading-mask
  position: absolute
  left: 50%
  top: 37%
  height: 30px
  border-radius: 6px
  opacity: .65
  background-color: #fff
  transform translate3d(-50%, 0, 0)
  animation: spinner-fade 1s linear infinite
  .custom-loading-spinner
    padding 8px 12px
  .custom-loading-text
    font-size 14px
    color #666
</style>
