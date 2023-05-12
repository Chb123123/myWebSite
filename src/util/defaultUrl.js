import axios from 'axios'
import router from '../router'

const instance = axios.create({
  baseURL: 'http://127.0.0.1',
  timeout: 5000,
  headers: {
    Authorization: localStorage.getItem('webiteToken')
  }
})

// 请求时的拦截
instance.interceptors.request.use((config) => {
  if (localStorage.getItem('webiteToken') != null) {
    config.headers.Authorization = localStorage.getItem('webiteToken')
  }

  return config
}, (error) => {
  return Promise.resolve(error)
})

// 响应时拦截
instance.interceptors.response.use(function(response) {
  // 返回响应时做一些处理
  // 请求状态码为 2 时, 表示 token 失败
  if (response.data.status === 2) {
    router.replace({
      path: '/login' // 到登录页重新获取token
    })
    // 删除本地存储的 token
    localStorage.removeItem('webiteToken')
  }
  return response
}, function(error) {
  console.log(error)
  // 当响应异常时做一些处理
  error.message = '网络超时，请重试'
  return Promise.reject(error)
})

export default instance
