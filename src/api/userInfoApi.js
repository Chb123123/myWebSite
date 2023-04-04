import axios from '@/util/defaultUrl'

// 注册
export const registerUser = function (username, password) {
  return axios({
    method: 'post',
    url: '/api/registerUser',
    data: {
      accountNumber: username,
      password: password
    }
  })
}

// 判断账号是否在数据库中存在
export const userIsExist = function (accountNumber) {
  return axios({
    method: 'get',
    url: '/api/userIsExist',
    params: {
      accountNumber: accountNumber
    }
  })
}

// 登入
export const loginModule = function (username, password) {
  return axios({
    method: 'post',
    url: '/api/loginFunction',
    data: {
      accountNumber: username,
      password: password
    }
  })
}

// 获取用户信息
export const getUserInfo = function (userId, number) {
  return axios({
    method: 'GET',
    url: '/api/userInfo',
    params: {
      userId: userId,
      accountNumber: number
    }
  })
}

// 获取用户首页 Tab 栏信息
export const getUserIndex = function () {
  return axios({
    method: 'get',
    url: '/api/userIndex'
  })
}

export const getTableInfo = function (tableInfo) {
  return axios({
    method: 'get',
    url: '/api/tableInfo',
    params: {
      tableText: tableInfo
    }
  })
}

// 修改用户签名
export const upDataSignature = function (id, str) {
  return axios({
    method: 'POST',
    url: '/api/updataSignature',
    data: {
      userId: id,
      signature: str
    }
  })
}

export const updataUserPic = function (id, picUrl) {
  console.log(id, picUrl)
  return axios({
    method: 'POST',
    url: '/api/updataUserPic',
    data: {
      userId: id,
      userPic: picUrl
    }
  })
}
