<template>
  <div class="message--wrap">
    <div class="message--notices" v-show="isNotices" :class="notices.type" :key="notices._name">
      <div class="message--content">{{notices.content}}</div>
    </div>
  </div>
</template>

<script>
// 默认选项
const DefaultOptions = {
  duration: 1500,
  type: 'info',
  content: '这是一条提示信息！'
}
let mid = 0
export default {
  name: 'message',
  data () {
    return {
      isNotices: false,
      notices: {}
    }
  },
  methods: {
    add (notice = {}) {
      if (this.isNotices) {
        return
      }
      // name标识 用于移除弹窗
      const _name = this.getName()
      // 合并选项
      notice = Object.assign({
        _name
      }, DefaultOptions, notice)
      this.isNotices = true
      this.notices = notice

      setTimeout(() => {
        this.removeNotice(_name)
      }, notice.duration)
    },
    getName () {
      return 'msg_' + (mid++)
    },
    removeNotice (_name) {
      this.isNotices = false
      // const index = this.notices.findIndex(item => item._name === _name)
      // this.notices.splice(index, 1)
    }
  }
}
</script>

<style scoped>
  .message--wrap {
    position: fixed;
    top: 50px;
    left: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    transform: translateX(-50%);
  }

  .message--notices {
    --borderWidth: 3px;
    min-width: 240px;
    max-width: 500px;
    margin-bottom: 10px;
    border-radius: 3px;
    box-shadow: 0 0 8px #f2f2f2;
    overflow: hidden;
  }

  .message--content {
    padding: 8px;
    line-height: 1.3;
  }

  .message--notices.info {
    border-left: var(--borderWidth) solid #909399;
    background: #F4F4F5;
  }

  .message--notices.success {
    border-left: var(--borderWidth) solid #67C23A;
    background: #F0F9EB;
  }

  .message--notices.error {
    border-left: var(--borderWidth) solid #F56C6C;
    background: #FEF0F0;
  }

  .message--notices.warning {
    border-left: var(--borderWidth) solid #E6A23C;
    background: #FDF6EC;
  }
</style>
