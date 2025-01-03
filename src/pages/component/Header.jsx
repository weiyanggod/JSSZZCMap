import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { getIPInfo, getWeatherInfo } from '@/api/common.js'
import cutImg from '@/assets/切换.png'
import { useDispatch } from 'react-redux'
import { setSelect, setPoint } from '@/store/index.js'
import { getCompany } from '@/api/common.js'
import { getPoint } from '@/api/MapApp.js'

import '@/pages/styles/Header.less'

const Header = () => {
  const dispatch = useDispatch()
  const [weatherInfo, setWeatherInfo] = useState({
    weather: '',
    temperature: '',
  })
  const [selectList, setSelectList] = useState([])
  const [selectValue, setSelectValue] = useState('')
  const [nowTime, setNowTime] = useState(dayjs().format('HH:mm:ss'))
  const [fetching, setFetching] = useState(false)
  const [pointList, setPointList] = useState([])

  // 更新当前时间
  setInterval(() => {
    setNowTime(dayjs().format('HH:mm:ss'))
  }, 1000)

  // 选择
  const onSelect = (value) => {
    setSelectValue(value)
    dispatch(setSelect(value))
  }

  // 位置选择
  const selectPoint = (value) => {
    const item = pointList.find((i) => i.field0132 === value.value)
    dispatch(setPoint(item))
  }

  // 清除选择点
  const clearPoint = () => {
    dispatch(setPoint(''))
  }

  // 远程搜索
  const debounceFetcher = lodash.debounce((value) => {
    setFetching(true)
    getPoint({ id: selectValue, name: value }).then((res) => {
      const list = res.filter((i) => i.field0012 !== null)
      setPointList(list)
      setFetching(false)
    })
  }, 500)

  useEffect(() => {
    const render = async () => {
      const { data } = await getIPInfo()
      const {
        data: { lives: weather },
      } = await getWeatherInfo({
        city: data.adcode,
      })

      const selectList = await getCompany()

      setSelectList([
        {
          name: '全部',
          id: '',
        },
        ...selectList,
      ])
      setWeatherInfo({
        weather: weather ? weather[0]?.weather : '',
        temperature: weather ? weather[0].temperature : '',
      })
    }
    render()
  }, [])

  return (
    <ConfigProvider
      theme={{
        components: {
          Select: {
            optionFontSize: '0.8vw',
            optionActiveBg: '#266c75',
            optionSelectedBg: 'transparent',
          },
        },
      }}>
      <div className=' text-white'>
        <Time className='time'>
          <div className='flex  items-center'>
            <img
              src={getWeatherIcon(weatherInfo.weather)}
              className='w-[40px] h-[40px]'
            />
            <div className='ml-16px w-96px'>
              <div className='text-20px timeColor tracking-4px font-600 fa-115 '>
                {weatherInfo.temperature}°C
              </div>
              <div className='text-10px color-[#90FFF6] fa-45'>
                {weatherInfo.weather}
              </div>
            </div>
            <div className='ml-16px'>
              <div className='text-20px timeColor tracking-4px font-600'>
                {nowTime}
              </div>
              <div className='text-10px color-[#90FFF6] fa-45'>
                {dayjs().format('YYYY年MM月DD日')}
              </div>
            </div>
            <div className='week  text-20px tracking-4px font-600 timeColor mb-a'>
              {week[dayjs().format('d')]}
            </div>
          </div>
        </Time>
        <Title className='timeColor Title'>经营性资产数字地图</Title>
        <Edit className='Edit'>
          <Select
            allowClear
            showSearch
            labelInValue
            placeholder='请输入'
            filterOption={false}
            onSearch={debounceFetcher}
            fieldNames={{
              label: 'field0110',
              value: 'field0132',
            }}
            notFoundContent={fetching ? <Spin size='small' /> : null}
            options={pointList}
            onSelect={selectPoint}
            onClear={clearPoint}
            className='mr-20px w-200px h-[30px]'
          />

          <div className='flex   items-center'>
            <Select
              defaultValue='全部'
              className='mr-20px w-150px h-[30px]'
              onSelect={onSelect}
              fieldNames={{ label: 'name', value: 'id' }}
              options={selectList}
            />
          </div>
          <img
            src={cutImg}
            className='cursor-pointer w-[55px] h-[55px]'
            onClick={() => {
              window.location.reload()
            }}
          />
        </Edit>
      </div>
    </ConfigProvider>
  )
}

const Time = styled.div`
  position: absolute;
`

const Title = styled.div`
  color: #fff;
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0);
  font-style: italic;
  font-family: 'AlibabaPuHuiTi-115';
`
const Edit = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
`

export default Header
