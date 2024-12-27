// 左侧资产
import styled from 'styled-components'
import ThreeDBar from './3DBar.jsx'
import ThreeDPie from './3DPie.jsx'
import threeDPieBackgroundImage from '@/assets/3d饼图背景.png'
import titleBackgroundImage from '@/assets/标题背景.png'
import bracketsBackgroundImage from '@/assets/资产总览大括号.png'
import { getOverAll, getAssetProportion, getAssetNature } from '@/api/Assets.js'
import { useSelector } from 'react-redux'
const Assets = () => {
  const select = useSelector((state) => state.data.select)

  // 资产总览
  const [areaList, setAreaList] = useState([130000, 86008, 10512, 4058])
  const [extraInfo, setExtraInfo] = useState([
    {
      name: '土地面积',
      number: 0 + 'm²',
    },
    {
      name: '入账总价值',
      number: 0 + '万元',
    },
    {
      name: '产权数量',
      number: 0,
    },
    {
      name: '抵押数量',
      number: 0,
    },
    {
      name: '空置率',
      number: 0 + '%',
    },
  ])

  //资产占比
  const [assetProportionData, setAssetProportionXData] = useState({
    xData: ['梅里', '闻川', '盛宏'],
    yData: [100, 200, 300],
  })

  // 资产性质
  const [assetNatureData, setAssetNatureData] = useState([])
  const getAreaInfo = (type, index) => {
    let info = ''

    if (index === 0) {
      info = '房产面积'
    }
    if (index === 1) {
      info = '可租面积'
    }
    if (index === 2) {
      info = '自用面积'
    }
    if (index === 3) {
      info = '共用面积'
    }

    if (type === 'icon') {
      return new URL(`../../assets/${info}.png`, import.meta.url).href
    } else {
      return info
    }
  }

  useEffect(() => {
    const render = async () => {
      const overAllData = await getOverAll({ company: select })
      const assetProportionData = await getAssetProportion()
      const assetNatureData = await getAssetNature({ company: select })
      setAreaList([
        overAllData.field0020,
        overAllData.field0074,
        overAllData.field0128,
        overAllData.field0129,
      ])
      setExtraInfo([
        {
          name: '土地面积',
          number: overAllData.field0021.toLocaleString() + 'm²',
        },
        {
          name: '入账总价值',
          number: overAllData.field0016.toLocaleString() + '万元',
        },
        {
          name: '产权数量',
          number: overAllData.field0045.toLocaleString(),
        },
        {
          name: '抵押数量',
          number: overAllData.field0121.toLocaleString(),
        },
        {
          name: '空置率',
          number: overAllData.rate * 100 || 0 + '%',
        },
      ])
      const xData = []
      const yData = []
      assetProportionData.forEach((item) => {
        xData.push(item.field0111)
        yData.push(item.field0020)
      })

      setAssetProportionXData({
        xData,
        yData,
      })

      setAssetNatureData(() => {
        const result = []
        assetNatureData.forEach((item) => {
          result.push([item.field0012, (item.rate * 1).toLocaleString() * 1])
        })

        return result
      })
    }
    render()
  }, [select])

  return (
    <Page>
      <Title>资产总览</Title>
      <AreaList>
        {areaList.map((item, index) => {
          return (
            <div className='flex   w-1/2   mt-2 items-center' key={index}>
              <img src={getAreaInfo('icon', index)} />
              <div className='ml-1'>
                <div className='color-[#D4EFEA] fa-85'>
                  {getAreaInfo('name', index)}
                </div>
                <div className='number'>{item.toLocaleString()}</div>
              </div>
            </div>
          )
        })}
      </AreaList>
      <ExtraInfo>
        <div className='w-full flex flex-wrap  pl-[75px] py-[10px]'>
          {extraInfo.map((item, index) => {
            return (
              <div
                key={index}
                className='item'
                style={{
                  paddingLeft: index === 2 ? '10px' : '',
                }}>
                <div className='text-white text-sm fa-55'>{item.name}</div>
                <div className='number text-[10px]'>
                  {item.number.toLocaleString()}
                </div>
              </div>
            )
          })}
        </div>
      </ExtraInfo>
      <Title data-mt='10'>资产占比</Title>
      <div className='w-full h-10rem flex justify-center'>
        <div className='w-80%'>
          <ThreeDBar
            height='220px'
            xData={assetProportionData.xData}
            yData={assetProportionData.yData}></ThreeDBar>
        </div>
      </div>
      <Title data-mt='50'>资产性质</Title>
      <div className='w-full flex-1 flex justify-center'>
        <div
          className='w-80%'
          style={{
            backgroundImage: `url(${threeDPieBackgroundImage})`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: '100px 60px',
          }}>
          <ThreeDPie realData={assetNatureData}></ThreeDPie>
        </div>
      </div>
    </Page>
  )
}

const Page = styled.div`
  position: relative;
  left: ${pxToRem(15)};
  top: ${pxToRem(83)};
  width: ${pxToRem(500)};
  height: ${pxToRem(780)};
  display: flex;
  align-items: center;
  flex-direction: column;
`

export const Title = styled.div`
  background-image: url(${titleBackgroundImage});
  background-size: 100% 100%;
  width: ${pxToRem(423)};
  height: ${pxToRem(40)};
  font-size: 18px;
  font-family: 'AlibabaPuHuiTi-75';
  color: #ecf2ff;
  text-align: left;
  margin-top: ${(props) => {
    return props['data-mt'] ? pxToRem(props['data-mt']) : pxToRem(20)
  }};
  line-height: ${pxToRem(35)};
  padding-left: ${pxToRem(30)};
  box-sizing: border-box;
`
const AreaList = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 80%;
  margin-left: ${pxToRem(20)};
  justify-content: space-around;
  .number {
    font-size: ${pxToRem(20)};
    letter-spacing: ${pxToRem(0.5)};
    font-weight: 600;
    background: linear-gradient(to bottom, #23fffd, #fff);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`
const ExtraInfo = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  margin-top: ${pxToRem(10)};
  background-image: url(${bracketsBackgroundImage});
  background-position: 50% 0%;
  background-repeat: no-repeat;
  .item {
    width: 33%;
    box-sizing: border-box;
  }
  .number {
    font-weight: 600;
    font-size: ${pxToRem(15)};
    margin-top: ${pxToRem(2)};
    background: linear-gradient(
      to bottom,
      #fdff60,
      #fff
    ); /*设置渐变的方向从左到右 颜色从ff0000到ffff00*/
    -webkit-background-clip: text; /*将设置的背景颜色限制在文字中*/
    -webkit-text-fill-color: transparent; /*给文字设置成透明*/
  }
`

export default Assets
