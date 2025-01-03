// 左侧资产
import styled from 'styled-components'
import ThreeDBar from './3DBar.jsx'
import ThreeDPie from './3DPie.jsx'
import threeDPieBackgroundImage from '@/assets/3d饼图背景.png'
import titleBackgroundImage from '@/assets/标题背景.png'
import bracketsBackgroundImage from '@/assets/资产总览大括号.png'
import { getOverAll, getAssetProportion, getAssetNature } from '@/api/Assets.js'
import '@/pages/styles/Assets.less'
const Assets = ({ selectId }) => {
  // 资产总览
  const [areaList, setAreaList] = useState([130000, 86008, 10512, 4058])
  const [extraInfo, setExtraInfo] = useState([])

  //资产占比
  const [assetProportionData, setAssetProportionXData] = useState({
    xData: [],
    yData: [],
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
      const overAllData = await getOverAll({ id: selectId })
      const assetProportionData = await getAssetProportion()
      const assetNatureData = await getAssetNature({ id: selectId })
      setAreaList([
        overAllData.field0020,
        overAllData.field0074,
        overAllData.field0128,
        overAllData.field0129,
      ])
      setExtraInfo([
        {
          name: '土地面积',
          number: overAllData.field0021.toFixed(2) + 'm²',
        },
        {
          name: '入账总价值',
          number: overAllData.field0016.toFixed(2) + '万元',
        },
        {
          name: '产权数量',
          number: overAllData.field0045.toFixed(2),
        },
        {
          name: '抵押数量',
          number: overAllData.field0121.toFixed(2),
        },
        {
          name: '空置率',
          number: (overAllData.rate * 100).toFixed(2) + '%',
        },
      ])
      const xData = []
      const yData = []
      assetProportionData.forEach((item) => {
        xData.push(item.field0111)
        yData.push((item.field0020 * 1).toFixed(2) * 1)
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
  }, [selectId])

  return (
    <Page className='PageStyle'>
      {/* 资产总览 */}
      <AreaList className='AreaListStyle'>
        <Title>资产总览</Title>
        <div className='content'>
          {areaList.map((item, index) => {
            return (
              <div className='flex   w-1/2   mt-10px items-center ' key={index}>
                <img
                  src={getAreaInfo('icon', index)}
                  className='w-55px h-50px'
                />
                <div className='ml-1 text-[16px]'>
                  <div className='color-[#D4EFEA] fa-85 '>
                    {getAreaInfo('name', index)}
                  </div>
                  <div className='number'>{item.toLocaleString()}</div>
                </div>
              </div>
            )
          })}
        </div>
      </AreaList>
      {/* 面积 */}
      <ExtraInfo className='ExtraInfoStyle'>
        <div className='w-full flex flex-wrap py-[10px]'>
          {extraInfo.map((item, index) => {
            return (
              <div
                key={index}
                className='item'
                style={{
                  paddingLeft: index === 2 ? '10px' : '',
                }}>
                <div className='text-white text-[16px] fa-55'>{item.name}</div>
                <div className='number text-[10px]'>
                  {item.number.toLocaleString()}
                </div>
              </div>
            )
          })}
        </div>
      </ExtraInfo>
      <Title data-mt='2'>资产占比</Title>
      <div className='w-full h-[28%] flex justify-center'>
        <div className='w-100% pt-[2%]'>
          <ThreeDBar
            height='100%'
            xData={assetProportionData.xData}
            yData={assetProportionData.yData}></ThreeDBar>
        </div>
      </div>
      <Title data-mt='2'>资产性质</Title>
      <div className='w-full flex-1 flex justify-center'>
        <div
          className='w-100%'
          style={{
            backgroundImage: `url(${threeDPieBackgroundImage})`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: '50% 90%',
          }}>
          <ThreeDPie realData={assetNatureData}></ThreeDPie>
        </div>
      </div>
    </Page>
  )
}
Assets.propTypes = {
  selectId: PropTypes.string.isRequired,
}
const Page = styled.div`
  position: relative;

  display: flex;
  align-items: center;
  flex-direction: column;
`

export const Title = styled.div`
  background-image: url(${titleBackgroundImage});
  background-size: 100% 100%;
  background-repeat: no-repeat;
  width: 23.8vw;
  height: 2.02vw;
  display: flex;
  align-items: center;
  font-size: 0.909vw;
  font-family: 'AlibabaPuHuiTi-75';
  color: #ecf2ff;
  text-align: left;
  margin-top: ${(props) => {
    return props['data-mt'] ? props['data-mt'] + '%' : '%'
  }};
  line-height: 1.76vw;
  padding-left: 1.51vw;
  box-sizing: border-box;
`
const AreaList = styled.div`
  .number {
    font-weight: 600;
    background: linear-gradient(to bottom, #23fffd, #fff);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`
const ExtraInfo = styled.div`
  /* background-image: url(${bracketsBackgroundImage}); */
  background-position: 50% 0%;
  .item {
    box-sizing: border-box;
  }
  .number {
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
