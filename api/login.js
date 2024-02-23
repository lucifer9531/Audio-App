import request from '@/utils/request'

// 登录方法
export function login(account, password) {
  const data = {
    account,
    password,
  }
  return request({
    'url': '/api/sys/login',
    headers: {
      isToken: false,
    },
    'method': 'post',
    'data': data
  })
}
// 获取用户详细信息
export function getInfo() {
  return request({
    'url': '/api/sys/user',
    'method': 'get'
  })
}

// 退出方法
export function logout() {
  return request({
    'url': '/api/sys/logout',
    'method': 'get'
  })
}
