import ReactEcharts from 'echarts-for-react'
import geoJson from '@/utils/秀洲区.js'
import * as echarts from 'echarts/core'
import mapImg from '@/assets/纹理.jpg'
import Model from '@/pages/component/Model.jsx'
import { getPoint } from '@/api/MapApp.js'
import buildingTag from '@/assets/楼宇标签.png'
const MapApp = ({ selectId }) => {
  const [showModal, setShowModal] = useState(false)
  const [totalZoom, setTotalZoom] = useState(1.2)
  const [buildData, setBuildData] = useState({})
  let mapCenter = []
  const mapRef = useRef(null)
  const [option, setOption] = useState({
    geo: {
      map: 'map',
      silent: true,
      roam: true,
      zoom: totalZoom,
      itemStyle: {
        borderColor: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: '#a1fbb4', // 0% 处的颜色
            },
            {
              offset: 1,
              color: '#3dffef', // 100% 处的颜色
            },
          ],
          global: false, // 缺省为 false
        },
        borderWidth: 3,
        areaColor: {
          type: 'image',
          image: mapImg, // 使用纹理图片
          repeat: 'repeat',
        }, // 地图图形颜色
      },
    },
    tooltip: {
      trigger: 'item', // 可以根据需要选择 "item" 或 "axis"
      formatter: (params) => {
        return params.name // 显示当前区域的名称
      },
    },
    title: {
      show: false,
    },
    emphasis: {
      disabled: true,
    },
    series: {
      // 地图,可以是数组，多个
      type: 'effectScatter',
      coordinateSystem: 'geo',
      rippleEffect: {
        number: 0,
      },

      symbol: 'image://' + buildingTag,
      symbolSize: [20, 50],
      symbolRotate: 0,
      data: [],
    },
  })

  echarts.registerMap('map', { geoJSON: geoJson })

  const onEvents = {
    click: ({ data }) => {
      setBuildData(data)
      const newOption = lodash.cloneDeep(option)
      if (mapCenter.length > 0) {
        newOption.geo.center = mapCenter
        newOption.geo.center = mapCenter
        setOption(newOption)
      }
      setShowModal(true)
    },
    georoam: async (params) => {
      let { dx, dy } = params
      const newOption = lodash.cloneDeep(option)

      if (params.totalZoom) {
        setTotalZoom(params.totalZoom)
      }
      mapCenter = mapRef.current.getEchartsInstance().getOption().geo[0].center

      if (dx || dy || (dx === 0 && dy === 0)) {
        return
      }
      newOption.geo.zoom = params.totalZoom
      newOption.geo.center = mapRef.current
        .getEchartsInstance()
        .getOption().geo[0].center
      setOption(newOption)
    },
  }

  const render = async () => {
    const res = await getPoint({ company: selectId })
    const list = []

    res.forEach((item) => {
      if (item.field0012 !== null) {
        list.push({
          name: item.field0110,
          value: [
            item.field0012.split(',')[0] * 1,
            item.field0012.split(',')[1] * 1,
          ],
          id: item.field0132,
        })
      }
    })
    return list
  }

  useEffect(() => {
    render().then((res) => {
      const newOption = lodash.cloneDeep(option)
      newOption.series.data = res
      setOption(newOption)
    })
  }, [selectId])

  return (
    <div>
      <ReactEcharts
        ref={mapRef}
        id='map'
        className='map'
        style={{ height: '800px', width: '900px' }}
        option={option}
        onEvents={onEvents}></ReactEcharts>
      <Model
        buildData={buildData}
        showModal={showModal}
        cutModal={(state) => {
          setShowModal(state)
        }}></Model>
    </div>
  )
}
MapApp.propTypes = {
  selectId: PropTypes.string.isRequired,
}
export default MapApp
