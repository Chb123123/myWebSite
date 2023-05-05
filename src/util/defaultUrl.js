import axios from 'axios'
import router from '../router'

const instance = axios.create({
  baseURL: 'http://127.0.0.1',
  timeout: 5000,
  headers: {
    Authorization: localStorage.getItem('webiteToken')
    // "admin-token":'123456',
    // "Client-Type": 'MALL_MOBILE',
    // "Client-Type": 'application/json',
    // //'Content-Type': 'application/x-www-form-urlencoded',
    // // 'X-Custom-Header': 'foobar',
    // //'Access-Control-Allow-Origin': '*',
    // // "X-Requested-With": "XMLHttpRequest"
  }
})

// 请求时的拦截
instance.interceptors.request.use((config) => {
  // console.log(config)
  // 发送请求之前做一些处理
  // if (config.url.indexOf(process.env.VUE_APP_QL_ROOT) >= 0) { // 易得接口
  //   config.withCredentials = false;
  //   config.headers = {
  //     "AdminToken": sessionStorage.getItem("admin-token"),
  //   };
  // }
  // console.log(config);
  if (localStorage.getItem('webiteToken') != null) {
    config.headers.Authorization = localStorage.getItem('webiteToken')
  }

  return config
}, (error) => {
  // // 当请求异常时做一些处理
  // if (error.response.status === 504 || error.response.status === 404) {
  //     alert('服务器异常')
  // } else if (error.response.status === 403) {
  //     alert('权限不足,请联系管理员')
  // } else {
  //     alert('未知错误')
  // }
  return Promise.resolve(error)
})

// 响应时拦截
instance.interceptors.response.use(function(response) {
  // console.log(response.data.code)
  // 返回响应时做一些处理
  // 请求状态码为 2 时, 表示 token 失败
  if (response.data.status === 2) {
    router.replace({
      path: '/login' // 到登录页重新获取token
    })
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
