import { message } from 'antd'
import { MessageInstance } from 'antd/es/message/interface'
import React, { createContext } from 'react'

type ToastProviderType = {
    children: React.ReactNode
}

const toast: MessageInstance = {
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
export const ToastContext = createContext(toast)

const ToastProvider = ({ children }: ToastProviderType) => {
    const [messageApi, contextHolder] = message.useMessage();
    return (
        <ToastContext.Provider value={messageApi}>
            {contextHolder}
            {children}
        </ToastContext.Provider>
    )
}

export default ToastProvider