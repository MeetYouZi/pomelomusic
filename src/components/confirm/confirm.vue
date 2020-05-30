<template>
  <transition name="toast-fade">
    <div class="confirmToast" v-show="showFlag" @click.stop>
      <div class="toast-wrapper">
        <div class="toast-content">
          <p class="text">{{text}}</p>
          <div class="operate">
            <div @click="cancel" class="operate-btn left">{{cancelBtnText}}</div>
            <div @click="toast" class="operate-btn">{{toastBtnText}}</div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'confirm',
  props: {
    text: {
      type: String,
      default: '提示'
    },
    toastBtnText: {
      type: String,
      default: '确定'
    },
    cancelBtnText: {
      type: String,
      default: '取消'
    }
  },
  data () {
    return {
      showFlag: false
    }
  },
  methods: {
    show () {
      this.showFlag = true
    },
    hide () {
      this.showFlag = false
    },
    cancel () {
      this.hide()
      this.$emit('cancel')
    },
    toast () {
      this.hide()
      this.$emit('toast')
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

  .confirmToast
    position fixed
    left 0
    right 0
    top 0
    bottom 0
    z-index 998
    &.toast-fade-enter-active
      animation toast-fadein 0.3s
      .toast-content
        animation toast-zoom 0.3s
    .toast-wrapper
      position absolute
      top 50%
      left 50%
      transform translate(-50%, -50%)
      z-index 999
      .toast-content
        width 280px
        border-radius 13px
        background var(--bg)
        box-shadow 0 0 20px 0 rgba(0,0,0,.1)
        .text
          padding 19px 15px
          line-height 22px
          text-align center
          font-size $font-size-large
          color var(--c_txt2)
        .operate
          display flex
          align-items center
          text-align center
          font-size $font-size-large
          .operate-btn
            flex 1
            line-height 22px
            padding 10px 0
            border-top 1px solid var(--bgborder)
            color var(--c_txt1)
            &.left
              border-right: 1px solid var(--bgborder)

  @keyframes toast-fadein
    0%
      opacity 0
    100%
      opacity 1

  @keyframes toast-zoom
    0%
      transform scale(0)
    50%
      transform scale(1.1)
    100%
      transform scale(1)
</style>
