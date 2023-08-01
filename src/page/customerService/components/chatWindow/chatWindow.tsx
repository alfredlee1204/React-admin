import { useState } from 'react'
import cssStyle from './chatWindow.module.scss'
import List from "antd/es/list"
import DefaultAvatarSVG from '@/assets/images/default-user.svg'
type Message = {
    id: string,
    type: 'text' | 'image' | 'video'
    content: string,
    sourceUserNo: string,
    time: string
}
const ChatWindow = () => {
    const [msgData, setMsgData] = useState<Message[]>([
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
    return (
        <div className={cssStyle["chatWindow"]} style={{ backgroundColor: "#fff" }}>
            <ChatWindowTopbar />
            <MessageList data={msgData} />
            <InputArea />
        </div>
    )
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

export default ChatWindow