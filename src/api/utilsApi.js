import axios from 'axios'

export const getHitokoto = async () => {
  return axios({
    method: 'GET',
    url: "https://v1.hitokoto.cn"
  })
};