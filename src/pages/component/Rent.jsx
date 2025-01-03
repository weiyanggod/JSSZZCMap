// 右侧出租
import { Title } from '@/pages/component/Assets.jsx'
import styled from 'styled-components'
import ReactEcharts from 'echarts-for-react'
import legendImg from '@/assets/图例.png'
import legendImg2 from '@/assets/图例2.png'
import legendImg3 from '@/assets/图例3.png'
import {
  getRentOverview,
  getBusinessAnalysis,
  getRentStation,
} from '@/api/Rent.js'
import { useEffect, useState } from 'react'
import '@/pages/styles/Rent.less'

const ProgressColorList = [
  {
    '0%': '#1e9efc ',
    '100%': '#2eb2fd',
  },
  {
    '0%': '#90ffeb',
    '100%': '#cffdf5',
  },
  {
    '0%': '#d5ffff',
    '100%': '#e6ffff',
  },
]

const Rent = ({ selectId }) => {
  const [progressList, setProgressList] = useState([])
  const [pieData, setPieData] = useState([])
  const [lineData, setLineData] = useState([])
  const [lineXAxisData, setLineXAxisData] = useState([])

  const getPieOption = () => {
    let option = {
      tooltip: {
        trigger: 'item',
        formatter: '{b}:{d}%',
      },
      legend: {
        top: '10%',
        right:
          window.innerWidth <= 1440
            ? '5%'
            : window.innerWidth >= 1920
              ? '10%'
              : '10%',
        orient: 'vertical',
        itemGap: 15,
        itemWidth: 15,
        icon: 'diamond',
        textStyle: {
          color: '#d4efea',
        },
      },
      color: [
        '#c7e9ff',
        '#3872e5',
        '#5dbaff',
        '#17d6ea',
        '#3533d6',
        '#95aaff',
        '#f4b767',
        '#57b65c',
        '#95c3d8',
      ],
      series: [
        {
          left: '5%',
          top: '3%',
          right: '40%',
          type: 'pie',
          radius: ['40%', '65%'],
          avoidLabelOverlap: false,
          label: {
            show: true,
            backgroundColor: 'transparent',
            color: '#fff',
          },
          labelLine: {
            length: 10,
            length2: 0,
          },
          data: pieData,
        },
      ],
    }
    return option
  }
  const getLineOption = () => {
    const legendData = []
    lineData.forEach((item, index) => {
      let icon = 'image://' + legendImg
      if (index === 1) {
        icon = 'image://' + legendImg2
      }
      if (index === 2) {
        icon = 'image://' + legendImg3
      }
      legendData.push({
        name: item.name,
        icon: icon,
      })
    })
    const option = {
      tooltip: {
        show: true,
        trigger: 'item',
      },
      grid: {
        left: '5%', //图表距边框的距离
        right: '3%',
        top: '20%',
        bottom: '0%',
        containLabel: true,
      },
      legend: {
        show: true,
        top: '5%',
        bottom: '10%',
        left: '20%',
        itemGap: 10,
        itemWidth: 15,
        textStyle: {
          color: '#d4efea',
        },
        data: legendData,
      },
      xAxis: {
        type: 'category',
        data: lineXAxisData,
        // 不显示x轴刻度
        axisTick: {
          show: false,
        },
        axisLabel: {
          color: '#d4efea',
          interval: 0,
          rotate: '50',
        },
      },
      yAxis: {
        name: '租金(万元)',
        nameTextStyle: {
          color: '#d4efea',
          padding: [0, 0, 5, 0],
        },
        type: 'value',
        axisLine: {
          show: false,
        },
        splitLine: {
          lineStyle: {
            color: ['#2e5168'],
            width: 2,
          },
        },
        // 设置y轴的颜色
        axisLabel: {
          color: '#d4efea',
        },
      },
      color: ['#44b9ed', '#3c89ea', '#e8fcfc', '#a2ffff'],
      series: [],
    }
    if (lineData.length > 0) {
      lineData.forEach((item) => {
        option.series.push({
          symbol: 'none',
          name: item.name,
          data: item.data,
          type: 'line',
          lineStyle: {
            shadowColor: '#0b676e',
            shadowOffsetX: 10,
            shadowOffsetY: 10,
            opacity: 1, //透明度
            shadowBlur: 8, //阴影大小
            type: 'solid', //实线
            width: 2,
          },
        })
      })
    }

    return option
  }

  const render = async () => {
    const progressListRes = await getRentOverview({ id: selectId })
    const pieDataRes = await getBusinessAnalysis({ id: selectId })
    const lineDataRes = await getRentStation()

    setPieData(
      pieDataRes.map((item) => {
        return {
          value: item.rate,
          name: item.field0136,
        }
      }),
    )
    setProgressList([
      {
        name: '出租总面积',
        number: (progressListRes.field0077 * 1).toLocaleString(),
      },
      {
        name: '合同总金额',
        number: (progressListRes.field0169 * 1).toLocaleString(),
      },
      {
        name: '出租率',
        number: (progressListRes.rate * 100).toFixed(2),
      },
    ])

    const temp = []
    const tempLineXAxisData = new Set(lineDataRes.map((item) => item.field0025))

    setLineXAxisData(() => {
      const list = []
      tempLineXAxisData.forEach((i) => {
        list.push(i)
      })
      return list
    })

    const nameList = new Set(lineDataRes.map((item) => item.field0035))
    nameList.forEach((item) => {
      temp.push({
        name: item,
        data: [],
      })
    })
    lineDataRes.forEach((item) => {
      temp.forEach((item2) => {
        if (item.field0035 === item2.name) {
          item2.data.push(item.field0019)
        }
      })
    })

    setLineData(temp)
  }

  useEffect(() => {
    render()
  }, [selectId])

  return (
    <Page className='Page'>
      <Title>出租总览</Title>
      <ProgressList className='ProgressList'>
        {progressList.map((item, index) => {
          return (
            <div key={index} className='mt-12px w-2/3'>
              <div className='text-[#D4EFEA]  fa-85'>{item.name}</div>
              <div className='w-full mt-[10px]'>
                <Progress
                  strokeColor={ProgressColorList[index]}
                  strokeLinecap='butt'
                  trailColor='#2c4353'
                  format={() => {
                    return index === 0 ? (
                      <div>{item.number}m²</div>
                    ) : index === 1 ? (
                      <div>{item.number}万元</div>
                    ) : (
                      <div>{item.number}%</div>
                    )
                  }}
                  percent={item.number}
                />
              </div>
            </div>
          )
        })}
      </ProgressList>
      <Title className='mt-[10px]'>业态分析</Title>
      <div className='w-full h-[30%]'>
        <ReactEcharts style={{ height: '100%' }} option={getPieOption()} />
      </div>
      <Title>本年收租情况</Title>
      <div className='w-full h-[30%] px-[10%] box-border'>
        <ReactEcharts style={{ height: '100%' }} option={getLineOption()} />
      </div>
    </Page>
  )
}

Rent.propTypes = {
  selectId: PropTypes.string.isRequired,
}

const Page = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
`
const ProgressList = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: left;
  .title {
    margin-right: auto;
  }
`
export default Rent
