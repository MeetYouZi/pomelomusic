import axios from 'axios'

const loadinginstace = 0
const baseUrl = process.env.VUE_APP_BASE_API_URL
class HttpRequest {
  getInsideConfig () {
    const config = {
      baseURL: baseUrl,
      timeout: 60000, // request timeout 2分钟
      headers: {
        'Content-Type': 'application/json'
      }
    }
    return config
  }

  interceptors (instance, url) {
    // 请求拦截
    instance.interceptors.request.use(config => {
      // 添加全局的loading...
      return config
    }, error => {
      loadinginstace.hide()
      return Promise.reject(error)
    })
    // 响应拦截
    instance.interceptors.response.use(response => {
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
