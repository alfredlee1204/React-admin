import { useCallback, useEffect, useRef, useState } from 'react'
import cssStyle from './chatWindow.module.scss'
import DefaultAvatarSVG from '@/assets/images/default-user.svg'
import {
    SmileOutlined,
    SendOutlined
} from '@ant-design/icons';
import { Button } from 'antd';
import useWebSocket from '@/use/useWebSocket';
import { observer } from "mobx-react-lite"
import { motion } from 'framer-motion';

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
    const { messageList } = useWebSocket(2)
    const listEnd = useRef<HTMLDivElement | null>(null)
    useEffect(() => {
        // 有新消息的时候自动滚到底部
        listEnd.current?.scrollIntoView(false);
    }, [messageList?.length])
    return (
        <div className={cssStyle["message-list"]}>
            {messageList?.map(item => {
                return (
                    <motion.div
                        key={item.time}
                        layout
                        transition={{ duration: 0.2 }}
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }} >
                        <MessageItem data={item}></MessageItem>
                    </motion.div>
                )
            })}

            <div style={{ float: "left", clear: "both" }}
                ref={listEnd}>
            </div>

        </div>
    )
})

const InputArea = () => {
    const { sendWsMsg } = useWebSocket(2)
    const textareaRef = useRef<HTMLTextAreaElement | null>(null)
    const [content, setContent] = useState('');
    const handleInput = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setContent(e.target.value)
    }, [])
    const sendMsg = useCallback(() => {
        if (content) {
            sendWsMsg(content)
            setContent('')
            textareaRef.current?.focus()
        }
    }, [content, sendWsMsg])
    return (
        <div className={cssStyle["inputArea"]}>
            <div className={cssStyle["toolBar"]}><SmileOutlined className={cssStyle["icon"]} /></div>
            <div className={cssStyle["entry"]}>
                <textarea ref={textareaRef} value={content} onChange={handleInput}></textarea>
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

    return <div className={cssStyle[from === 1 ? "message-item-self" : "message-item-other"]}>
        <div className={cssStyle["message-body"]}>
            {content}
        </div>
    </div>
}

export default ChatWindow