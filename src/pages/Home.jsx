import Header from './component/Header.jsx'
import Assets from './component/Assets.jsx'
import MapApp from './component/MapApp.jsx'
import Rent from './component/Rent.jsx'
import styled from 'styled-components'
import backgroundImageUrl from '@/assets/背景.png'
import { useSelector } from 'react-redux'

const Home = () => {
  const selectId = useSelector((state) => state.data.select)
  const point = useSelector((state) => state.data.point)

  return (
    <Page>
      <Header selectId={selectId}></Header>
      <Assets selectId={selectId}></Assets>
      <MapApp selectId={selectId} point={point}></MapApp>
      <Rent selectId={selectId}></Rent>
    </Page>
  )
}

const Page = styled.div`
  position: relative;
  background-image: url(${backgroundImageUrl});
  background-repeat: no-repeat;
  background-size: 100% 100%;
  width: 100%;
  height: 100%;
`

export default Home
