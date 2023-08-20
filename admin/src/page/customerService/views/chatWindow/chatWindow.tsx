import { useCallback, useEffect, useState } from 'react'
import cssStyle from './chatWindow.module.scss'
import DefaultAvatarSVG from '@/assets/images/default-user.svg'
import {
    SmileOutlined,
    SendOutlined
} from '@ant-design/icons';
import { Button } from 'antd';
import useSocket from '@/use/useSocket';
import { observer } from "mobx-react-lite"

type Message = {
    id: string,
    type: 'text' | 'image' | 'video'
    content: string,
    from: number,
    target: number,
    time: string
}
const ChatWindow = observer(() => {
    return (
        <div className={cssStyle["chatWindow"]} style={{ backgroundColor: "#fff" }}>
            <ChatWindowTopbar />
            <MessageList />
            <InputArea />
        </div>
    )
})

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

const MessageList = observer(() => {
    const { messageList } = useSocket(2)
    useEffect(() => {
        console.log(messageList)
    }, [messageList])
    return (
        <div className={cssStyle["message-list"]}>
            {messageList?.map(item => {
                return <MessageItem key={item.time} data={item}></MessageItem>
            })}
        </div>
    )
})

const InputArea = () => {
    const { sendWsMsg } = useSocket(2)
    const [content, setContent] = useState('');
    const handleInput = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setContent(e.target.value)
    }, [])
    const sendMsg = useCallback(() => {
        sendWsMsg(content)
    }, [content, sendWsMsg])
    return (
        <div className={cssStyle["inputArea"]}>
            <div className={cssStyle["toolBar"]}><SmileOutlined className={cssStyle["icon"]} /></div>
            <div className={cssStyle["entry"]}>
                <textarea value={content} onChange={handleInput}></textarea>
            </div>
            <div className={cssStyle["btn-send"]}>
                <Button onClick={sendMsg} type="primary" icon={<SendOutlined />}>
                    发送
                </Button>
            </div>
        </div>
    )
}

const MessageItem = (prop: { data: Message }) => {
    const { content, from } = prop.data
    useEffect(() => {
        console.log(content)
    })
    return <div className={cssStyle[from === 1 ? "message-item-self" : "message-item-other"]}>
        <div className={cssStyle["message-body"]}>
            {content}
        </div>
    </div>
}

export default ChatWindow