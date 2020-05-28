<template>
  <!--弹出层提示-->
  <transition name="toast-fade" @after-leave="handleAfterLeave">
    <div v-show="visible" role="alert" class="toast">{{ message }}</div>
  </transition>
</template>

<script>
const DEFAULT_DURATION = 2500

export default {
  name: 'Toast',
  data () {
    return {
      visible: false,
      // 默认显示文本
      message: '',
      // 显示时间, 毫秒
      duration: DEFAULT_DURATION,
      // 回调函数
      onClose: null,
      closed: false,
      timer: null
    }
  },
  watch: {
    closed (newVal) {
      if (newVal) {
        this.visible = false
      }
    }
  },
  mounted () {
    this.startTimer()
  },
  methods: {
    // 动画结束后
    handleAfterLeave () {
      // 手动销毁当前实例
      this.$destroy()
      // 移除 DOM
      this.$el.parentNode.removeChild(this.$el)
    },
    // 启动定时器
    startTimer () {
      if (this.duration <= 0) {
        return
      }
      this.timer = setTimeout(() => {
        // 确保只执行一次 close
        if (!this.closed) {
          this.close()
        }
      }, this.duration)
    },
    // 关闭'toast'
    close () {
      this.closed = true
      if (typeof this.onClose === 'function') {
        this.onClose(this)
      }
    }
  }
}
</script>

<style>
  .toast {
    position: fixed;
    top: 50%;
    left: 50%;
    z-index: 1999;
    margin-top: -20px;
    box-sizing: border-box;
    border-radius: 5px;
    padding: 10px 20px;
    max-width: 80%;
    min-height: 40px;
    overflow: hidden;
    font-size: 14px;
    text-align: center;
    line-height: 20px;
    color: #fff;
    background: rgba(0, 0, 0, 0.5);
    user-select: none;
    transform: translateX(-50%);
  }

  .toast-fade-enter,
  .toast-fade-leave-to {
    opacity: 0;
    transform: translate3d(-50%, -1em, 0);
  }

  .toast-fade-enter-active,
  .toast-fade-leave-active {
    will-change: transform;
    transition: all 0.2s;
  }

  .toast-fade-enter-to,
  .toast-fade-leave {
    opacity: 1;
    transform: translate3d(-50%, 0, 0);
  }
</style>
