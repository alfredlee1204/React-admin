import List from "antd/es/list"
import { useCallback, useEffect, useRef, useState } from "react"
import io, { Socket } from 'socket.io-client'

import cssStyle from './customerService.module.scss'
import Layout from "antd/es/layout";
import Sider from "antd/es/layout/Sider";

import DefaultAvatarSVG from '@/assets/images/default-user.svg'
type Message = {
    id: string,
    type: 'text' | 'image' | 'video'
    content: string,
    sourceUserNo: string,
    time: string
}
const CustomerService = () => {
    const [msgData, setMsgData] = useState<Message[]>([])
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

    useEffect(() => {
        setMsgData([
            {
                id: '1',
                type: 'text',
                content: '测试消息',
                sourceUserNo: '1',
                time: '1'
            },
            {
                id: '1',
                type: 'text',
                content: '测试消息',
                sourceUserNo: '1',
                time: '1'
            },
            {
                id: '1',
                type: 'text',
                content: '测试消息',
                sourceUserNo: '1',
                time: '1'
            },
            {
                id: '1',
                type: 'text',
                content: '测试消息',
                sourceUserNo: '1',
                time: '1'
            },
            {
                id: '1',
                type: 'text',
                content: '测试消息',
                sourceUserNo: '1',
                time: '1'
            },
            {
                id: '1',
                type: 'text',
                content: '测试消息',
                sourceUserNo: '1',
                time: '1'
            },
            {
                id: '1',
                type: 'text',
                content: '测试消息',
                sourceUserNo: '1',
                time: '1'
            },
            {
                id: '1',
                type: 'text',
                content: '测试消息',
                sourceUserNo: '1',
                time: '1'
            },
            {
                id: '1',
                type: 'text',
                content: '测试消息',
                sourceUserNo: '1',
                time: '1'
            },
        ])
    }, [])
    useEffect(() => {
        ws.current = io(import.meta.env.VITE_SCOKET_DOMAIN, {
            transports: ['websocket']
        })
        ws.current.on('connect', () => {
            console.log("success")
        })
        return () => { ws.current?.disconnect() };
    }, [])

    return <Layout style={{ height: '100%', borderRadius: 10, overflow: "hidden" }}>
        <MessageSider></MessageSider>
        <Layout>
            <div className={cssStyle["chatWindow"]} style={{ backgroundColor: "#fff" }}>
                <ChatWindowTopbar />
                <MessageList data={msgData} />
                <InputArea />
            </div>
        </Layout>
    </Layout>
}


const ChatWindowTopbar = () => {
    return (
        <div className={cssStyle["topbar"]}>
            <img className={cssStyle["avatar"]} src={DefaultAvatarSVG} />
            <div className={cssStyle["userinfo"]}>
                <div className={cssStyle["infoItem"]}>
                    <label>用戶名：</label>
                    <span>6412233</span>
                </div>
                <div className={cssStyle["infoItem"]}>
                    <label>用戶ID：</label>
                    <span>6412233</span>
                </div>

            </div>
        </div>
    )
}

const MessageList = (prop: any) => {
    const { data } = prop
    return (
        <div className={cssStyle["message-list"]}>
            <List
                split={false}
                dataSource={data}
                renderItem={(item: any) => (
                    <List.Item key={item.id}>
                        <MessageItem isSelf={true} msg={item}></MessageItem>
                    </List.Item>
                )}
            />
        </div>
    )
}

const InputArea = () => {

    return (
        <div className={cssStyle["inputArea"]}></div>
    )
}

const MessageSider = () => {
    return (
        <Sider
            style={{ backgroundColor: "#f5f5f5", }}
        >
            <div className={cssStyle["message-sider"]}>
                <div className={cssStyle["message-sider-title"]}>用户列表</div>
                <div className={cssStyle["message-sider-list"]}>
                    <MsssageSiderItem />
                    <MsssageSiderItem />
                    <MsssageSiderItem />
                    <MsssageSiderItem />
                </div>
            </div>

        </Sider>
    )
}

const MsssageSiderItem = () => {
    return (
        <div className={cssStyle["msssage-sider-item"]}>
            <div className={cssStyle["avatar"]}>
                <img src={DefaultAvatarSVG} />
            </div>
            <div className={cssStyle["right"]}>
                <div className={cssStyle["name"]}>
                    用户1
                </div>
                <div className={cssStyle["message"]}>
                    發覺浪費空間的離開房間是打開
                </div>
            </div>
        </div>
    )
}

type MessageItemProp = {
    isSelf: boolean,
    msg: Message,
}
const MessageItem = (prop: MessageItemProp) => {
    const { msg, isSelf } = prop

    return <div className={cssStyle[isSelf ? "message-item-self" : "message-item-other"]}>
        <div className={cssStyle["message-body"]}>
            {msg.content}
        </div>
    </div>
}


export default CustomerService