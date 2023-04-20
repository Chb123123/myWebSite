import axios from '@/util/defaultUrl'
const userInfo = JSON.parse(localStorage.getItem('myWebiteUser'))

export const getFouseMapList = function(id) {
  return axios({
    method: 'get',
    url: '/api/getHomeFouseMap',
    params: {
      userId: id
    }
  })
}

// 用户发布文章
export const uploadArticle = function(userId, article, title) {
  return axios({
    method: 'post',
    url: '/api/releaseArticle',
    data: {
      userId: userId,
      article: article,
      title: title
    }
  })
}

// 获取用户发布的文章
export const getUserArticleList = function(page, size) {
  const data = {
    userId: userInfo.userId
  }
  if (page || size) {
    data.page = page
    data.size = size
  }
  return axios({
    method: 'get',
    url: '/api/getArticleList',
    params: data
  })
}
