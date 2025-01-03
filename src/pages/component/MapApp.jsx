import { Map } from 'react-amap'
import ReactEcharts from 'echarts-for-react'
import geoJson from '@/utils/秀洲区地图数据.js'
import * as echarts from 'echarts/core'
import mapImg from '@/assets/纹理.jpg'
import Model from '@/pages/component/Model.jsx'
import { getPoint } from '@/api/MapApp.js'
import buildingTag from '@/assets/楼宇标签.png'
import { useEffect, useState } from 'react'
const MapApp = ({ selectId, point }) => {
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
      label: {
        show: true,
        color: '#fff',
        fontSize: 16,
      },
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
      trigger: 'item',
      formatter: (params) => {
        return params.name
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

  // // 搜索位置时更新
  // useEffect(() => {
  //   if (point !== '') {
  //     const newOption = lodash.cloneDeep(option)
  //   }
  // }, [point])

  const render = async () => {
    const res = await getPoint({ id: selectId })
    const list = []

    res.forEach((item) => {
      if (item.field0012 !== null) {
        list.push({
          name: item.field0110,
          value: [
            item.field0012.split(',')[0] * 1,
            item.field0012.split(',')[1] * 1,
          ],
          id: item.field0132 || item.field0110,
        })
      }
    })
    return list
  }

  useEffect(() => {
    const newOption = lodash.cloneDeep(option)
    if (point === '') {
      render().then((res) => {
        newOption.series.data = res
        delete newOption.geo.center
        setOption(newOption)
      })
    } else {
      newOption.series.data = [
        {
          name: point.field0110,
          value: [
            point.field0012.split(',')[0] * 1,
            point.field0012.split(',')[1] * 1,
          ],
          id: point.field0132 || point.field0110,
        },
      ]
      newOption.geo.center = newOption.series.data[0].value
      setOption(newOption)
    }

    // if (mapRef.current) {
    //   AMapLoader.load({
    //     key: '35037ea8f35be185dea66c9f13aa1e2c', //申请好的Web端开发者 Key，调用 load 时必填
    //     version: '2.0', //指定要加载的 JS API 的版本，缺省时默认为 1.4.15
    //   }).then((AMap) => {
    //     AMap.plugin('AMap.DistrictSearch', () => {
    //       const district = new AMap.DistrictSearch({
    //         subdistrict: 3,
    //         extensions: 'all',
    //         level: 'city',
    //       })
    //       district.search('重庆市', function (status, result) {
    //         var bounds = result.districtList[0]['boundaries']
    //         var mask = []
    //         for (var i = 0; i < bounds.length; i++) {
    //           mask.push([bounds[i]])
    //         }
    //         var map = new AMap.Map(mapRef.current, {
    //           mask: mask,
    //           zoom: 10, //设置当前显示级别
    //           expandZoomRange: true, //开启显示范围设置
    //           zooms: [7, 20], //最小显示级别为7，最大显示级别为20
    //           center: [116.43, 39.92],
    //           viewMode: '3D', //这里特别注意，设置为3D则其它地区不显示
    //           zoomEnable: true, //是否可以缩放地图
    //           resizeEnable: true,
    //           mapStyle: 'amap://styles/light',
    //         })
    //         //添加描边
    //         for (var i = 0; i < bounds.length; i++) {
    //           new AMap.Polyline({
    //             path: bounds[i],
    //             strokeColor: '#3078AC',
    //             strokeWeight: 2,
    //             map: map,
    //           })
    //         }
    //       })
    //     })
    //   })
    // }
  }, [selectId, point])

  return (
    <div>
      <ReactEcharts
        ref={mapRef}
        id='map'
        className='map'
        style={{ height: '40.4vw', width: '45.4vw' }}
        option={option}
        onEvents={onEvents}></ReactEcharts>
      <Model
        buildData={buildData}
        showModal={showModal}
        cutModal={(state) => {
          setShowModal(state)
        }}></Model>
    </div>
    // <div ref={mapRef} id='' className='map'></div>
  )
}
MapApp.propTypes = {
  selectId: PropTypes.string.isRequired,
  point: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
}
export default MapApp
