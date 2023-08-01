import { useCallback, useEffect, useRef, useState } from "react"
import io, { Socket } from 'socket.io-client'

import cssStyle from './customerService.module.scss'
import Layout from "antd/es/layout";
import Sider from "antd/es/layout/Sider";

import DefaultAvatarSVG from '@/assets/images/default-user.svg'
import { Outlet, useNavigate } from "react-router-dom";


const CustomerService = () => {
    const ws = useRef<Socket | null>()

    const messageFormat = useCallback((message: string, target: string) => {
        const msg = JSON.stringify({
            target: target,
            message: message
        })

        return msg
    }, [])

    const sendMessage = useCallback((message: string, target: string) => {
        const msg = messageFormat(target, message)
        ws.current?.emit('message', msg)
    }, [messageFormat])


    // useEffect(() => {
    //     ws.current = io(import.meta.env.VITE_SCOKET_DOMAIN, {
    //         transports: ['websocket']
    //     })
    //     ws.current.on('connect', () => {
    //         console.log("success")
    //     })
    //     return () => { ws.current?.disconnect() };
    // }, [])

    return <Layout style={{ height: '100%', borderRadius: 10, overflow: "hidden" }}>
        <MessageSider></MessageSider>
        <Layout>
            <Outlet />
        </Layout>
    </Layout>
}

const MessageSider = () => {
    const data = [
        {
            id: 1,
            username: "用户1",
            content: "消息1",
            avatar: DefaultAvatarSVG
        },
        {
            id: 2,
            username: "用户2",
            content: "消息1",
            avatar: DefaultAvatarSVG
        },
        {
            id: 3,
            username: "用户3",
            content: "消息1213412412412432143",
            avatar: DefaultAvatarSVG
        }
    ]
    return (
        <Sider
            style={{ backgroundColor: "#f5f5f5", }}
        >
            <div className={cssStyle["message-sider"]}>
                <div className={cssStyle["message-sider-title"]}>用户列表</div>
                <div className={cssStyle["message-sider-list"]}>
                    {
                        data.map(item => {
                            return <MsssageSiderItem key={item.id} item={item} />
                        })
                    }

                </div>

            </div>

        </Sider>
    )
}

const MsssageSiderItem = (prop: any) => {
    const navigateTo = useNavigate();
    const { item } = prop
    return (
        <div onClick={() => { navigateTo('user/' + item.id) }} className={cssStyle["msssage-sider-item"]}>
            <div className={cssStyle["avatar"]}>
                <img src={item.avatar} />
            </div>
            <div className={cssStyle["right"]}>
                <div className={cssStyle["name"]}>
                    {item.username}
                </div>
                <div className={cssStyle["message"]}>
                    {item.content}
                </div>
            </div>
        </div>
    )
}



export default CustomerService