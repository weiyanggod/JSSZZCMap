// 3d饼图
import Highcharts from 'highcharts'
// import HighchartsReact from 'highcharts-react-official'
import highcharts3d from 'highcharts/highcharts-3d'
import { useEffect } from 'react'
const ThreeDPie = (props) => {
  useEffect(() => {
    highcharts3d(Highcharts)
    const options = {
      chart: {
        backgroundColor: 'transparent',
        type: 'pie',
        options3d: {
          enabled: true,
          alpha: 55,
        },
      },
      title: {
        text: '',
      },
      credits: { enabled: false },
      tooltip: {
        headerFormat: '',
        pointFormat:
          '<div style="font-size: 13px"><span style="color:#000; font-weight:400">{point.name}</span><span style="font-weight:400">{(multiply point.y 100):.2f}%</span></div> ',
      },
      plotOptions: {
        pie: {
          size:
            window.innerWidth <= 1440
              ? 140
              : window.innerWidth >= 1920
                ? 160
                : 140,
          innerSize:
            window.innerWidth <= 1440
              ? 80
              : window.innerWidth >= 1920
                ? 120
                : 90,
          depth: 30,
          cursor: 'pointer',
          colors: ['#d6fbff', '#4efae3', '#7f9998', '#63c7f7', '#00F39F'],
          dataLabels: {
            softConnector: false,
            enabled: true,
            distance: 15,
            format: `<div ><span style="color:#d4efea; font-weight:400">{point.name}</span><br/><span style="color:#d4efea; font-weight:400">{(multiply point.y 100):.2f}%</span></div> `,
            style: {
              color: '#eee',
              fontSize: '13px',
              textOutline: 'none',
            },
          },
          center: ['50%', '60%'],
        },
      },
      series: [
        {
          name: '接入总量',
          data: props.realData,
        },
      ],
    }
    Highcharts.chart('pie', options)
  }, [props.realData])

  return <div id='pie' className='wh-full'></div>
}
ThreeDPie.propTypes = {
  realData: PropTypes.array.isRequired, // Use array and mark as required
}
export default ThreeDPie
