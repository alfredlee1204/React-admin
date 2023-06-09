import { useContext } from 'react'

import { MsgContext } from './messageProvider'


export const useMessage = () =>{
    const messageApi= useContext(MsgContext)

    return {messageApi}
}