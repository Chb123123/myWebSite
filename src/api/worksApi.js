import axios from '@/util/defaultUrl'

const userInfo = JSON.parse(localStorage.getItem('myWebiteUser'))

// 获取所有作品列表
export const getAllWorks = function(page, size) {
  return axios({
    method: 'GET',
    url: '/api/getWordsList',
    params: {
      page: page,
      size: size
    }
  })
}

// 获取用户发布的作品列表
export const getUserWorks = function(page, size) {
  return axios({
    method: 'GET',
    url: '/api/getUserWorks',
    params: {
      userId: userInfo.userId,
      page: page,
      size: size
    }
  })
}
