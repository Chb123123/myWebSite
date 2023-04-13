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

// 上传单个图片
export const uploadSingleImg = function(files) {
  return axios({
    method: 'post',
    url: '/api/uploadImg',
    data: {
      files: files
    }
  })
}
