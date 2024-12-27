import PropTypes from 'prop-types' // Import PropTypes
import dayjs from 'dayjs'
import lodash from 'lodash'
const pxToRem = (px) => `${px / 16}rem`

const week = [
  '星期日',
  '星期一',
  '星期二',
  '星期三',
  '星期四',
  '星期五',
  '星期六',
]
const iconWeatherMap = {
  风: [
    '有风',
    '平静',
    '微风',
    '和风',
    '清风',
    '强风/劲风',
    '疾风',
    '大风',
    '烈风',
    '风暴',
    '狂爆风',
    '飓风',
    '热带风暴',
    '龙卷风',
  ],
  多云: ['少云', '晴间多云', '多云'],
  雪: [
    '雪',
    '阵雪',
    '小雪',
    '中雪',
    '大雪',
    '暴雪',
    '小雪-中雪',
    '中雪-大雪',
    '大雪-暴雪',
    '冷',
  ],
  雾: [
    '浮尘',
    '扬沙',
    '沙尘暴',
    '强沙尘暴',
    '雾',
    '浓雾',
    '强浓雾',
    '轻雾',
    '大雾',
    '特强浓雾',
  ],
  晴: ['晴', '热'],
  雨夹雪: ['雨雪天气', '雨夹雪', '阵雨夹雪'],
  雨: [
    '阵雨',
    '雷阵雨',
    '雷阵雨并伴有冰雹',
    '小雨',
    '中雨',
    '大雨',
    '暴雨',
    '大暴雨',
    '特大暴雨',
    '强阵雨',
    '强雷阵雨',
    '极端降雨',
    '毛毛雨/细雨',
    '雨',
    '小雨-中雨',
    '中雨-大雨',
    '大雨-暴雨',
    '暴雨-大暴雨',
    '大暴雨-特大暴雨',
    '冻雨',
  ],
  阴: ['阴', '霾', '中度霾', '重度霾', '严重霾', '未知'],
}

// 获取天气图标
const getWeatherIcon = (weather) => {
  // 这个是icon的默认值
  let url = new URL(`../assets/weather/阴.png`, import.meta.url).href
  for (const weatherKey in iconWeatherMap) {
    if (Object.hasOwnProperty.call(iconWeatherMap, weatherKey)) {
      const weatherNames = iconWeatherMap[weatherKey]
      const findWeatherItem = weatherNames.find((name) => weather === name)

      // 如果找了某一类的图标了，那重新赋值url
      if (findWeatherItem) {
        // 这里的weatherKey和icon的名字一一对应了
        url = new URL(`../assets/weather/${weatherKey}.png`, import.meta.url)
          .href
        // console.debug('@find weather key = ', weatherKey)
        break
      }
    }
  }

  return url
}

export { PropTypes, pxToRem, dayjs, week, getWeatherIcon, lodash }
