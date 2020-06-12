<template>
  <transition name="dialog-fade">
    <div class="dialog" v-show="dialogShow">
      <div class="dialog_wrapper">
        <div class="dialog_content">
          <div class="dialog_title" v-text="titleText"></div>
          <slot>
            <div class="dialog_center" v-html="contentText"></div>
          </slot>
          <div class="dialog_btn">
            <div class="btn" @click="handleConfirm" v-text="dialogBtnText"></div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'dialog',
  props: {
    titleText: {
      type: String,
      default: '小柚提示'
    },
    dialogBtnText: {
      type: String,
      default: '确定'
    },
    contentText: {
      type: String,
      default: '这里是内容'
    }
  },
  data () {
    return {
      dialogShow: false
    }
  },
  methods: {
    // 显示事件
    show () {
      this.dialogShow = true
    },
    // 隐藏事件
    hide () {
      this.dialogShow = false
    },
    handleConfirm () {
      this.hide()
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .dialog
    position fixed
    left 0
    right 0
    top 0
    bottom 0
    z-index 998
    &.dialog-fade-enter-active
      animation toast-fadein 0.3s
      .dialog_content
        animation toast-zoom 0.3s
    &.dialog-fade-leave-active
      animation toast-fadeout 0.3s
    .dialog_wrapper
      position absolute
      top 50%
      left 50%
      transform translate(-50%, -50%)
      z-index 999
      .dialog_content
        width 280px
        border-radius 13px
        background var(--playlistBg)
        backdrop-filter saturate(180%) blur(10px)
        box-shadow 0 0 20px 0 rgba(0,0,0,.1)
        .dialog_title
          padding 15px
          text-align center
          color var(--c_txt1)
          font-size $font-size-medium-m
        .dialog_center
          padding 10px
          color var(--c_txt2)
          line-height 20px
        .dialog_btn
          display flex
          align-items center
          justify-content center
          padding 15px
          .btn
            font-size $font-size-medium
            text-align center
            color var(--c_txt1)
            padding 6px 18px
            border-1px(var(--c_txt2), 14px)

  @keyframes toast-fadein
    0%
      opacity 0
    100%
      opacity 1
  @keyframes toast-fadeout
    0%
      opacity 1
      transform scale(1)
    50%
      opacity 0.5
      transform scale(1.1)
    100%
      opacity 0
      transform scale(0)

  @keyframes toast-zoom
    0%
      transform scale(0)
    50%
      transform scale(1.1)
    100%
      transform scale(1)
</style>
