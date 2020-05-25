<template>
  <transition name="alert-move">
    <div class="alert">
      <div class="alert-main" v-for="item in notices" :key="item.name">
        <div class="alert-content">{{ item.content }}</div>
      </div>
    </div>
  </transition>
</template>

<script>
let seed = 0

function getUuid () {
  return 'alert_' + (seed++)
}

export default {
  data () {
    return {
      notices: []
    }
  },
  methods: {
    add (notice) {
      const name = getUuid()

      const _notice = Object.assign({
        name: name
      }, notice)

      this.notices.push(_notice)

      // 定时移除，单位：秒
      const duration = notice.duration
      setTimeout(() => {
        this.remove(name)
      }, duration * 1000)
    },
    remove (name) {
      const notices = this.notices

      for (let i = 0; i < notices.length; i++) {
        if (notices[i].name === name) {
          this.notices.splice(i, 1)
          break
        }
      }
    }
  }
}
</script>

<style scoped>
  .alert{
    position: fixed;
    width: 100%;
    top: 16px;
    left: 0;
    text-align: center;
    pointer-events: none;
    z-index: 998;
  }
  .alert-move-enter, .alert-move-leave-active{
    transition: all 0.3s ease-in-out;
    opacity: 0;

  }
  .alert-move-enter-active, .alert-move-leave-active{
    will-change: transform;
    transition: all 0.3s ease-in-out;
  }
  .alert-content{
    display: inline-block;
    padding: 8px 16px;
    background: #fff;
    border-radius: 3px;
    box-shadow: 0 1px 12px rgba(0, 0, 0, .2);
    margin-bottom: 8px;
  }
</style>
