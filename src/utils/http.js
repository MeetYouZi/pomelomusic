import HttpRequest from './axios'
const BASE_URL = process.env.NODE_ENV === 'development' ? '/api' : process.env.VUE_APP_BASE_API
// const BASE_URL = 'https://api.mtnhao.com/'

const axios = new HttpRequest(BASE_URL)

export default axios
