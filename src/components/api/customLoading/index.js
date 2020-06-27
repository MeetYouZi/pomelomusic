// loading/index.js
import Vue from 'vue'
import LoadingComponent from './customLoading.vue'

// 通过Vue.extend将组件包装成一个子类
const LoadingConstructor = Vue.extend(LoadingComponent)

let loading

LoadingConstructor.prototype.close = function () {
  // 如果loading 有引用，则去掉引用
  if (loading) {
    loading = undefined
  }
  // 先将组件隐藏
  this.visible = false
  // 延迟300毫秒，等待loading关闭动画执行完之后销毁组件
  setTimeout(() => {
    // 移除挂载的dom元素
    if (this.$el && this.$el.parentNode) {
      this.$el.parentNode.removeChild(this.$el)
    }
    // 调用组件的$destroy方法进行组件销毁
    this.$destroy()
  }, 300)
}

const Loading = (options = {}) => {
  // 如果组件已渲染，则返回即可
  if (loading) {
    return loading
  }
  // 要挂载的元素
  const parent = document.body
  // 组件属性
  const opts = {
    text: '',
    ...options
  }
  // 通过构造函数初始化组件 相当于 new Vue()
  const instance = new LoadingConstructor({
    el: document.createElement('div'),
    data: opts
  })
  // 将loading元素挂在到parent上面
  parent.appendChild(instance.$el)
  // 显示loading
  Vue.nextTick(() => {
    instance.visible = true
  })
  // 将组件实例赋值给loading
  loading = instance
  return instance
}

export default Loading
