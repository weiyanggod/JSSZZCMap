import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { getIPInfo, getWeatherInfo } from '@/api/common.js'
import cutImg from '@/assets/切换.png'
import homeImg from '@/assets/首页.png'
import { useDispatch } from 'react-redux'
import { setSelect } from '@/store/index.js'
import { getCompany } from '@/api/common.js'
const Header = () => {
  const dispatch = useDispatch()
  const [weatherInfo, setWeatherInfo] = useState({
    weather: '',
    temperature: '',
  })
  const [selectList, setSelectList] = useState([])
  const [nowTime, setNowTime] = useState(dayjs().format('HH:mm:ss'))

  setInterval(() => {
    setNowTime(dayjs().format('HH:mm:ss'))
  }, 1000)
  const onSelect = (value) => {
    dispatch(setSelect(value))
  }

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
            /* 这里是你的组件 token */
            selectorBg: 'rgba(0,0,0,0)',
            activeBorderColor: 'rgba(0,0,0,0)',
            hoverBorderColor: 'rgba(0,0,0,0)',
            optionFontSize: '0.8vw',
          },
        },
      }}>
      <div className='relative text-white'>
        <Time>
          <div className='flex  items-center'>
            <img
              src={getWeatherIcon(weatherInfo.weather)}
              style={{ width: 40, height: 40 }}
            />
            <div className='ml-4 w-6rem'>
              <div className='text-xl timeColor tracking-0.25rem font-600 fa-115 '>
                {weatherInfo.temperature}°C
              </div>
              <div className='text-0.625rem color-[#90FFF6] fa-45'>
                {weatherInfo.weather}
              </div>
            </div>
            <div className='ml-4'>
              <div className='text-xl timeColor tracking-0.25rem font-600'>
                {nowTime}
              </div>
              <div className='text-0.625rem color-[#90FFF6] fa-45'>
                {dayjs().format('YYYY年MM月DD日')}
              </div>
            </div>
            <div className='ml-4 text-xl tracking-0.25rem font-600 timeColor mb-a'>
              {week[dayjs().format('d')]}
            </div>
          </div>
        </Time>
        <Title className='timeColor'>经营性资产数字地图</Title>
        <Edit>
          <div className='flex   items-center'>
            <img
              src={cutImg}
              className='cursor-pointer'
              onClick={() => {
                window.location.reload()
              }}
            />
            <Select
              defaultValue='全部'
              style={{ width: '8vw' }}
              onSelect={onSelect}
              fieldNames={{ label: 'name', value: 'id' }}
              options={selectList}
            />
          </div>
          <div
            className='flex   items-center cursor-pointer'
            onClick={() => {
              window.location.reload()
            }}>
            <img src={homeImg} />
            <div className='timeColor font-600  fa-85'>首页</div>
          </div>
        </Edit>
      </div>
    </ConfigProvider>
  )
}

const Time = styled.div`
  position: absolute;
  top: ${pxToRem(7)};
  left: ${pxToRem(40)};
`

const Title = styled.div`
  /* text-shadow: 1px 0px 1px #fff; */
  font-size: ${pxToRem(28)};
  color: #fff;
  position: absolute;
  top: ${pxToRem(18)};
  left: 50%;
  transform: translate(-50%, 0);
  font-style: italic;
  letter-spacing: ${pxToRem(5)};
  font-family: 'AlibabaPuHuiTi-115';
`
const Edit = styled.div`
  position: absolute;
  top: ${pxToRem(0)};
  right: ${pxToRem(40)};
  display: flex;
  align-items: center;
`

export default Header
