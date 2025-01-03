import { RightOutlined, LeftOutlined } from '@ant-design/icons'
import styled from 'styled-components'
import titleBackgroundImage from '@/assets/弹框标题.png'
import { getBuildList, getRoomList } from '@/api/MapApp.js'
import '@/pages/styles/Model.less'

const truncate = {
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
}

const ModelApp = (props) => {
  const { showModal, cutModal, buildData } = props
  const [buildList, setBuildingList] = useState([])
  const [loading, setLoading] = useState(true)
  const [roomModal, setRoomModal] = useState(false)

  const [roomData, setRoomData] = useState({
    field0004: '',
    field0043: '',
    field0111: '',
    field0009: '',
    field0045: '',
    field0014: '',
    field0020: '',
    field0069: '',
    list: [],
  })
  const columns = [
    {
      title: '承租人',
      dataIndex: 'field0036',
      key: '1',
      align: 'center',
    },
    {
      title: '承租面积(m²)',
      dataIndex: 'field0127',
      align: 'center',
    },
    {
      title: '合同金额(元)',
      dataIndex: 'field0169',
      align: 'center',
    },
    {
      title: '合同期限',
      align: 'center',
      render: (params) => (
        <div>{params.field0033 + '至' + params.field0034}</div>
      ),
    },
  ]

  const LeftOutlinedStyle = {
    fontSize: '1vw',
    cursor: 'pointer',
    position: 'absolute',
    top: '1vw',
    color: '#b7f8e8',
  }

  const textStyle = {
    color: '#fff',
    fontFamily: 'AlibabaPuHuiTi-55',
  }

  const openRoomModal = async (item) => {
    cutModal(false)
    setRoomModal(true)
    const res = await getRoomList({
      id: item.field0029,
      id2: item.field0132,
    })
    const data = res
    data.list = res.ht
    delete data.ht
    setRoomData(res)
  }

  const render = async () => {
    setLoading(true)

    const res = await getBuildList({
      id: buildData.id,
      name: buildData.id === null ? buildData.name : null,
    })
    setBuildingList(res)
    setLoading(false)
  }

  useEffect(() => {
    render()
  }, [buildData])

  return (
    <ConfigProvider
      theme={{
        components: {
          Modal: {
            contentBg: 'rgba(40, 64, 71,0.8)',
            headerBg: 'none',
          },
          Table: {
            headerBg: '#65c8cf',
            headerColor: '#fff',
            headerBorderRadius: 0,
            cellPaddingBlockSM: 5,
            rowHoverBg: 'transparent',
          },
        },
      }}>
      <Modal
        loading={loading}
        title={buildData.name}
        open={showModal}
        footer={null}
        centered
        onCancel={() => {
          cutModal(false)
        }}
        mask={false}
        maskClosable={false}
        width={'45vw'}
        styles={{
          body: {
            maxHeight: '25.25vw',
            overflowY: 'auto',
            padding: '0px 0.75vw',
          },
        }}>
        <div>
          {buildList.map((item, index) => {
            return (
              <div
                key={index}
                className='w-full mt-3  bg-[#476f71] rounded-[10px] p-x-15px p-y-10px box-border flex'>
                <Descriptions
                  column={3}
                  colon={false}
                  labelStyle={{
                    color: '#aaf9fb',
                    fontFamily: 'AlibabaPuHuiTi-55',
                  }}
                  contentStyle={{
                    color: '#fff',
                    textAlign: 'center',
                    display: 'block',
                    fontFamily: 'AlibabaPuHuiTi-55',
                  }}>
                  <Descriptions.Item label='楼层' contentStyle={truncate}>
                    <Tooltip title={item.field0011}>
                      {item.field0011 || '-'}
                    </Tooltip>
                  </Descriptions.Item>
                  <Descriptions.Item label='室号'>
                    {item.field0010 || '-'}
                  </Descriptions.Item>
                  <Descriptions.Item label='面积'>
                    {item.field0020 ? item.field0020 + 'm²' : '-'}
                  </Descriptions.Item>
                  <Descriptions.Item
                    label='资产名称'
                    span={2}
                    contentStyle={truncate}>
                    <Tooltip title={item.field0004}>
                      {item.field0004 || '-'}
                    </Tooltip>
                  </Descriptions.Item>
                  <Descriptions.Item label='资产状态' span={1}>
                    <Image
                      preview={false}
                      width='40px'
                      height='20px'
                      src={getStatusUrl(item.field0069)}></Image>
                  </Descriptions.Item>
                </Descriptions>
                <RightOutlined
                  onClick={() => openRoomModal(item)}
                  style={{ fontSize: '1vw', color: '#fff', cursor: 'pointer' }}
                />
              </div>
            )
          })}
          {buildList.length == 0 && (
            <div className='mt-5'>
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description={<div className='text-white'>暂无数据</div>}
              />
            </div>
          )}
        </div>
      </Modal>
      <Modal
        title={
          <div className='w-[100%] px-[100px] truncate text-center box-border'>
            {roomData.field0004}
          </div>
        }
        open={roomModal}
        footer={null}
        centered
        onCancel={() => {
          setRoomModal(false)
        }}
        mask={false}
        maskClosable={false}
        width={'45vw'}>
        <div>
          <LeftOutlined
            onClick={() => {
              cutModal(true)
              setRoomModal(false)
            }}
            style={LeftOutlinedStyle}
          />
          <div>
            <Title className='title'>房源详情</Title>
            <div className='pl-10 mt-4'>
              <Descriptions
                column={2}
                labelStyle={textStyle}
                contentStyle={textStyle}>
                <Descriptions.Item label='资产名称' span={2}>
                  {roomData.field0004 || '-'}
                </Descriptions.Item>

                <Descriptions.Item label='产权单位'>
                  {roomData.field0043 || '-'}
                </Descriptions.Item>
                <Descriptions.Item label='管理单位'>
                  {roomData.field0111 || '-'}
                </Descriptions.Item>
                <Descriptions.Item label='坐落地址'>
                  {roomData.field0009 || '-'}
                </Descriptions.Item>

                <Descriptions.Item label='有无产证'>
                  {roomData.field0045 || '-'}
                </Descriptions.Item>
                <Descriptions.Item label='产证编号'>
                  {roomData.field0014 || '-'}
                </Descriptions.Item>
                <Descriptions.Item label='建筑面积'>
                  {roomData.field0020 ? roomData.field0020 + 'm²' : '-'}
                </Descriptions.Item>
                <Descriptions.Item label='资产状态' span={1}>
                  <Image
                    preview={false}
                    width='2.51vw'
                    height='1vw'
                    src={getStatusUrl(roomData.field0069)}></Image>
                </Descriptions.Item>
              </Descriptions>
            </div>
            <Title className='title'>资产详情</Title>
            <div className='pl-10 mt-4'>
              {roomData.list.length > 0 && (
                <Table
                  size='small'
                  pagination={false}
                  columns={columns}
                  border={true}
                  dataSource={roomData.list}
                  rowClassName={(record, index) => {
                    let className = ''
                    className =
                      index % 2 === 0
                        ? ' color-black fa-55 '
                        : ' color-black fa-55 '
                    return className
                  }}
                />
              )}
              {roomData.list.length === 0 && (
                <Empty
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                  description={<div className='text-white'>暂无数据</div>}
                />
              )}
            </div>
          </div>
        </div>
      </Modal>
    </ConfigProvider>
  )
}

const Title = styled.div`
  background-image: url(${titleBackgroundImage});
`

ModelApp.propTypes = {
  showModal: PropTypes.bool.isRequired,
  cutModal: PropTypes.func.isRequired,
  buildData: PropTypes.object.isRequired,
}
export default ModelApp
