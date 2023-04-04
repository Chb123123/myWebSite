import axios from '@/util/defaultUrl'

export const getFouseMapList = function (id) {
  return axios({
    method: 'get',
    url: '/api/getHomeFouseMap',
    params: {
      userId: id
    }
  })
}
