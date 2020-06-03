import Vue from 'vue'
import Message from './message.vue'

let messageInstance = null
const MessageConstructor = Vue.extend(Message)

const init = (() => {
  return function () {
    if (!messageInstance) {
      messageInstance = new MessageConstructor()
      messageInstance.$mount()
      document.body.appendChild(messageInstance.$el)
    }
    return messageInstance
  }
})()

const caller = (options) => {
  init(options)
  messageInstance.add(options)
}

export default {
  // 返回 install 函数 用于 Vue.use 注册
  install (vue) {
    vue.prototype.$message = caller
  }
}
