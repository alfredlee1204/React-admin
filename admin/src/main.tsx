import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import ConfigProvider from 'antd/es/config-provider/index'
import { MsgProvider } from './use/useMessage/messageProvider.tsx'
import SocketProvider from './store/socket/messageProvider.tsx'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: 'linear-gradient(118deg,#7367f0,rgba(115,103,240,0.7))',
          },
        }}
      >
        <MsgProvider>
          <SocketProvider>
            <App />
          </SocketProvider>
        </MsgProvider>
      </ConfigProvider>
    </BrowserRouter>
  </React.StrictMode>
)
