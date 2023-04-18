import axios from '@/util/defaultUrl'

export const getViewImages = function(page, size, type) {
  return axios({
    method: 'get',
    url: '/api/getViewImage',
    params: {
      page: page,
      size: size,
      type: type
    }
  })
}
