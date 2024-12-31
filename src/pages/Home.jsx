import Header from './component/Header.jsx'
import Assets from './component/Assets.jsx'
import MapApp from './component/MapApp.jsx'
import Rent from './component/Rent.jsx'
import styled from 'styled-components'
import RScaleScreen from 'r-scale-screen'
import backgroundImageUrl from '@/assets/背景.png'
import { useSelector } from 'react-redux'

const Home = () => {
  const selectId = useSelector((state) => state.data.select)

  return (
    <RScaleScreen height={911} width={1920} fullScreen>
      <Page>
        <Header></Header>
        <Assets selectId={selectId}></Assets>
        <MapApp selectId={selectId}></MapApp>
        <Rent selectId={selectId}></Rent>
      </Page>
    </RScaleScreen>
  )
}

const Page = styled.div`
  position: relative;
  background-image: url(${backgroundImageUrl});
  background-size: 100% 100%;
  width: 100%;
  height: 100%;
`

export default Home
