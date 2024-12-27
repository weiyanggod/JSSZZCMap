// router.js
import { createHashRouter } from 'react-router-dom'
import HomePage from '@/pages/Home.jsx'

// 定义路由配置
export const router = createHashRouter(
  [
    {
      path: '/',
      element: <HomePage />,
    },
  ],
  {
    future: {
      v7_relativeSplatPath: true,
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_skipActionErrorRevalidation: true,
    },
  },
)
