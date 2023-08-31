import { useContext } from 'react'

import { ToastContext } from './toastProvider'


export const useMessage = () =>{
    const messageApi= useContext(ToastContext)

    return {toast:messageApi}
}