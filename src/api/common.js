import axios from 'axios'
import request from '@/utils/https.js'

// 获取资产总览
export const getCompany = () => {
  return request.get('/getCompany')
}

// 获取定位信息
export const getIPInfo = () => {
  return axios.get('https://restapi.amap.com/v3/ip', {
    params: {
      key: '04d9bd599653be5ef7ab6642340ad701',
    },
  })
}

// 获取天气信息
export const getWeatherInfo = (parameters) => {
  return axios.get('https://restapi.amap.com/v3/weather/weatherInfo', {
    params: {
      key: '04d9bd599653be5ef7ab6642340ad701',
      ...parameters,
    },
  })
}
