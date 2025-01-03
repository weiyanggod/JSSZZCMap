// 3d柱状图
import ReactEcharts from 'echarts-for-react'
import * as echarts from 'echarts'

const ThreeDBar = (props) => {
  const getOption = () => {
    const xData = props.xData
    const yData = props.yData

    var barWidth = 30
    var constData = []
    var showData = []
    yData.filter(function (item) {
      if (item) {
        constData.push(1)
        showData.push(item)
      } else {
        constData.push(0)
        showData.push({
          value: 1,
          itemStyle: {
            normal: {
              borderColor: 'rgba(0,0,0,0)',
              borderWidth: 2,
              color: 'rgba(0,0,0,0)',
            },
          },
        })
      }
    })
    return {
      tooltip: {
        trigger: 'axis',
        formatter: function (params) {
          var str = params[0].axisValue + ':'
          params.filter(function (item) {
            if (item.componentSubType == 'bar') {
              str += +item.value
            }
          })
          return str
        },
      },

      grid: {
        left: '1%', //图表距边框的距离
        right: '3%',
        top: '20%',
        bottom: '0%',
        containLabel: true,
      },
      xAxis: {
        data: xData,
        axisLine: {
          show: false,
        },
        // 不显示x轴刻度
        axisTick: {
          show: false,
        },
        axisLabel: {
          color: '#d4efea',
          interval: 0,
        },
      },
      yAxis: {
        name: '产权面积m²',
        nameTextStyle: {
          color: '#d4efea',
          padding: [0, 60, 0, 0],
        },
        splitLine: {
          show: false,
        },
        axisLine: {
          show: false,
        },
        // 设置y轴的颜色
        axisLabel: {
          color: '#d4efea',
        },
      },
      series: [
        {
          z: 1,
          name: '数据',
          type: 'bar',
          barWidth: barWidth,
          barGap: '0%',
          data: yData,
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: '#07a29c' },
                { offset: 1, color: '#00f2bf' },
              ]),
            },
          },
        },
        {
          z: 2,
          name: '数据',
          type: 'pictorialBar',
          data: constData,
          symbol: 'diamond',
          symbolOffset: ['0%', '50%'],
          symbolSize: [barWidth, 10],
          itemStyle: {
            normal: {
              color: 'rgba(2, 143, 135,1)',
            },
          },
          tooltip: {
            show: false,
          },
        },
        {
          z: 3,
          name: '数据',
          type: 'pictorialBar',
          symbolPosition: 'end',
          data: showData,
          symbol: 'diamond',
          symbolOffset: ['0%', '-50%'],
          symbolSize: [barWidth - 4, (10 * (barWidth - 4)) / barWidth],
          itemStyle: {
            normal: {
              color: '#07a19b',
            },
          },
          tooltip: {
            show: false,
          },
        },
      ],
    }
  }

  return (
    <ReactEcharts
      style={{ height: props.height || '1.15vw' }}
      option={getOption()}
    />
  )
}
ThreeDBar.propTypes = {
  // Change prototype to propTypes
  xData: PropTypes.array.isRequired, // Use array and mark as required
  yData: PropTypes.array.isRequired, // Use array and mark as required
  height: PropTypes.string,
}
export default ThreeDBar
