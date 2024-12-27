import request from '@/utils/https.js'

// 获取楼宇区块位置
export const getPoint = (params) => {
  return request.get('/getPoint', params)
}
// 获取楼宇列表
export const getBuildList = (params) => {
  return request.get('/getBuildCard', params)
}

// 获取楼宇区块位置
export const getRoomList = (params) => {
  return request.get('/getBuild', params)
}
