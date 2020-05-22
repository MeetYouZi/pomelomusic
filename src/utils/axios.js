import Vue from 'vue'
import axios from 'axios'
// import store from '@/store'

const _vue = new Vue()
const loadinginstace = 0
class HttpRequest {
  constructor (baseUrl = baseURL) {
    this.baseUrl = baseUrl
  }

  getInsideConfig () {
    const config = {
      baseURL: this.baseUrl,
      // withCredentials: true, // 跨域请求时发送 cookies
      timeout: 60000, // request timeout 2分钟
      headers: {
        'Content-Type': 'application/json'
      }
    }
    return config
  }

  interceptors (instance, url) {
    const _vue = new Vue()
    // 请求拦截
    instance.interceptors.request.use(config => {
      // 添加全局的loading...
      // loadinginstace.show()
      return config
    }, error => {
      loadinginstace.hide()
      return Promise.reject(error)
    })
    // 响应拦截
    instance.interceptors.response.use(response => {
      // loadinginstace.hide()
      return Promise.resolve(response.data)
    },
    error => {
      throw error
    })
  }

  request (options) {
    const instance = axios.create()
    options = Object.assign(this.getInsideConfig(), options)
    this.interceptors(instance, options.url)
    return instance(options)
  }
}

export default HttpRequest
