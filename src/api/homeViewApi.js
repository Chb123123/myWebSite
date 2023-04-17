import axios from '@/util/defaultUrl'

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
