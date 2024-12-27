import { RouterProvider } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { router } from './router'
import { store } from './store/index.js'

import './index.less'
import 'virtual:uno.css'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider
      future={{
        v7_startTransition: true,
      }}
      router={router}
    />
  </Provider>,
)
