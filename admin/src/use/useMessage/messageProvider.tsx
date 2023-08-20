import { message } from 'antd'
import { MessageInstance } from 'antd/es/message/interface'
import React, { createContext } from 'react'

type MsgProviderType = {
    children: React.ReactNode
}

const msg: MessageInstance = {
    info: function () {
        throw new Error('Function not implemented.')
    },
    success: function () {
        throw new Error('Function not implemented.')
    },
    error: function () {
        throw new Error('Function not implemented.')
    },
    warning: function () {
        throw new Error('Function not implemented.')
    },
    loading: function () {
        throw new Error('Function not implemented.')
    },
    open: function () {
        throw new Error('Function not implemented.')
    },
    destroy: function () {
        throw new Error('Function not implemented.')
    },
}
export const MsgContext = createContext(msg)

export const MsgProvider = ({ children }: MsgProviderType) => {
    const [messageApi, contextHolder] = message.useMessage();
    return (
        <MsgContext.Provider value={messageApi}>
            {contextHolder}
            {children}
        </MsgContext.Provider>
    )
}