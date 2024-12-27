import request from '@/utils/https.js'

// 出租总览
export const getRentOverview = (params) => {
  return request.get('/getRentOverview', params)
}

// 业态分析
export const getBusinessAnalysis = (params) => {
  return request.get('/getBusinessAnalysis', params)
}

// 本年收租情况
export const getRentStation = () => {
  return request.get('/getRentStation')
}
