import upload from '@/utils/upload'
import request from '@/utils/request'

// 用户密码重置
export function updateUserPwd(data) {
  return request({
    url: '/api/sys/user/update-password',
    method: 'put',
    data
  })
}

// 查询用户个人信息
export function getUserProfile(customerId) {
  return request({
    url: `/api/as/customer/${customerId}`,
    method: 'get'
  })
}

// 修改用户个人信息
export function updateUserProfile(data) {
  return request({
    url: '/api/sys/user',
    method: 'put',
    data
  })
}

// 用户头像上传
export function uploadAvatar(data) {
  return upload({
    url: '/system/user/profile/avatar',
    name: data.name,
    filePath: data.filePath
  })
}
