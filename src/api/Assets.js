import request from '@/utils/https.js'
// 获取资产总览
export const getOverAll = (params) => {
  return request.get('/getOverAll', params)
}
// 获取资产占比
export const getAssetProportion = () => {
  return request.get('/getAssetProportion')
}

// 获取资产性质
export const getAssetNature = (params) => {
  return request.get('/getAssetNature', params)
}
