import { useCallback, useEffect, useRef, useState } from 'react'
import cssStyle from './chatWindow.module.scss'
import DefaultAvatarSVG from '@/assets/images/default-user.svg'
import {
    SmileOutlined,
    SendOutlined
} from '@ant-design/icons';
import { Button } from 'antd';

import { observer } from "mobx-react-lite"
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import { Message } from '@/store/socket/model';
import { useMessage, useWebSocket } from '@/store/rootProvider';

const ChatWindow = observer(() => {
    const { id } = useParams();
    const { readMsg } = useMessage()

    useEffect(() => {
        readMsg(Number(id))
    }, [id, readMsg])
    return (
        <div key={id} className={cssStyle["chatWindow"]} style={{ backgroundColor: "#fff" }}>
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
    const { id } = useParams();
    const [msgData, setMsgData] = useState<Message[] | undefined>([])
    const { getMessageData } = useMessage()
    const listEnd = useRef<HTMLDivElement | null>(null)
    useEffect(() => {
        setMsgData(getMessageData(Number(id)))
    }, [getMessageData, id])
    useEffect(() => {
        // 有新消息的时候自动滚到底部
        listEnd.current?.scrollIntoView(false);
    }, [msgData?.length])
    return (
        <div className={cssStyle["message-list"]}>
            {msgData?.map((item, index) => {
                return (
                    <motion.div
                        key={index}
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

const InputArea = observer(() => {
    const { id } = useParams();
    const { sendMessage } = useWebSocket()
    const textareaRef = useRef<HTMLTextAreaElement | null>(null)

    const sendMsg = useCallback(() => {
        // 非受控组件-完全由用户控制输入
        if (textareaRef.current?.value && id) {
            sendMessage(Number(id), textareaRef.current?.value)
            textareaRef.current.value = ''
            textareaRef.current?.focus()
        }
    }, [id, sendMessage])
    return (
        <div className={cssStyle["inputArea"]}>
            <div className={cssStyle["toolBar"]}><SmileOutlined className={cssStyle["icon"]} /></div>
            <div className={cssStyle["entry"]}>
                <textarea ref={textareaRef}></textarea>
            </div>
            <div className={cssStyle["btn-send"]}>
                <Button onClick={sendMsg} type="primary" icon={<SendOutlined />}>
                    发送
                </Button>
            </div>
        </div>
    )
})

const MessageItem = (prop: { data: Message }) => {
    const { content, target_id } = prop.data

    return <div className={cssStyle[target_id !== 1 ? "message-item-self" : "message-item-other"]}>
        <div className={cssStyle["message-body"]}>
            {content}
        </div>
    </div>
}

export default ChatWindow