import Vue from 'vue'
import ToastTemp from './toast.vue'

// 使用 Vue 构造器创建一个子类
const ToastConstructor = Vue.extend(ToastTemp)

const instances = []
let instance = null
let num = 1

// 初始 zIndex
let zIndex = 1996

const nextZIndex = () => zIndex++

const youToast = (options = {}) => {
  // 服务端渲染时不执行操作
  if (Vue.prototype.$isServer) {
    return
  }
  // 参数重载
  if (typeof options === 'string') {
    options = {
      message: options
    }
  }
  const id = 'you_toast_' + num++

  // 包装 onClose 方法
  const userOnClose = options.onClose
  options.onClose = function () {
    youToast.close(id, userOnClose)
  }

  // 创建 / 挂载实例
  instance = new ToastConstructor({ data: options })
  instance.id = id
  instance.vm = instance.$mount()
  document.body.appendChild(instance.vm.$el)
  instance.visible = true
  instance.$el.style.zIndex = nextZIndex()
  instances.push(instance)
  return instance
}

// 关闭指定 toast
youToast.close = (id, userOnClose) => {
  for (let i = 0; i < instances.length; i++) {
    if (id === instances[i].id) {
      if (typeof userOnClose === 'function') {
        userOnClose(instances[i])
      }
      instances.splice(i, 1)
      break
    }
  }
}

// 关闭所有 toast
youToast.closeAll = () => {
  for (let i = instances.length - 1; i >= 0; i--) {
    instances[i].close()
  }
}

// 在 Vue 原型上挂载 youToast
youToast.install = vue => {
  vue.prototype.$youToast = youToast
}

// const myToast = youToast({
//   message: '哈哈',
//   duration: 100000,
//   onClose () {
//     console.log('回调')
//   }
// })
// // youToast('哈哈哈哈哈哈哈哈哈哈')
// console.log(myToast)
// setTimeout(() => {
//   // myToast.close()
//   youToast.closeAll()
// }, 1500)

export default youToast
