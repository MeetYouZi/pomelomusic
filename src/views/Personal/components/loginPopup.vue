<template>
  <transition name="toast-fade">
    <div class="toast" v-show="showFlag" @click.stop>
      <div class="toast-wrapper">
        <div class="toast-content">
          <p class="text">{{text}}</p>
          <div class="loginBox">
            <div class="login_form">
              <input
                class="inputBox"
                placeholder="请输入手机号"
                v-model="login.phone"
              />
            </div>
            <div class="login_form">
              <input
                class="inputBox"
                type="password"
                placeholder="请输入密码"
                v-model="login.password"
              />
            </div>
          </div>
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
  props: {
    text: {
      type: String,
      default: '登录'
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
      showFlag: false,
      login: {
      }
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
      this.$emit('toast', this.login)
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

  .toast
    position fixed
    left 0
    right 0
    top 0
    bottom 0
    z-index 998
    &.toast-fade-enter-active
      animation: toast-fadein 0.3s
      .toast-content
        animation: toast-zoom 0.3s
    .toast-wrapper
      position: absolute
      top: 50%
      left: 50%
      transform: translate(-50%, -50%)
      z-index: 999
      .toast-content
        width: 270px
        border-radius: 13px
        background var(--bg)
        box-shadow 0 0 20px 0 rgba(0,0,0,.1)
        .text
          padding: 19px 15px
          line-height: 22px
          text-align: center
          font-size: $font-size-large
          color var(--c_txt2)
        .loginBox
          position relative
          .login_form
            padding 8px 16px
            .inputBox
              width 100%
              height 40px
              border-radius 20px
              padding-left 8px
              color #fff
              outline none
              border 1px solid var(--bgborder)
              background var(--searchBg)
              appearance: none
        .operate
          display: flex
          align-items: center
          text-align: center
          font-size: $font-size-large
          .operate-btn
            flex: 1
            line-height: 22px
            padding: 10px 0
            border-top: 1px solid var(--bgborder)
            color var(--c_txt1)
            &.left
              border-right: 1px solid var(--bgborder)

  @keyframes toast-fadein
    0%
      opacity: 0
    100%
      opacity: 1

  @keyframes toast-zoom
    0%
      transform: scale(0)
    50%
      transform: scale(1.1)
    100%
      transform: scale(1)
</style>
