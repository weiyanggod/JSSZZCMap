import { configureStore, createSlice } from '@reduxjs/toolkit'
import { useSelector, useDispatch } from 'react-redux'
// 定义初始状态为包含多个属性的对象

const initialState = {
  select: '',
}

// 创建切片
const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    setSelect: (state, action) => {
      state.select = action.payload
    },
  },
})

// 导出切片的 actions
export const { setSelect } = counterSlice.actions

// 配置 Redux store
export const store = configureStore({
  reducer: {
    data: counterSlice.reducer,
  },
})

export { useSelector, useDispatch }
