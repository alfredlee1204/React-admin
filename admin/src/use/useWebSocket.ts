import { useCallback, useContext, useEffect, useRef, useState } from "react"
import WebSocketContext from "@/store/socket/webSocketContext";
import { WebSocketData } from "@/store/socket/model";

const useWebSocket = (user_id: string, target_id?: string) => {
    const [roomId, setRoomId] = useState('')
    const wsStore = useContext(WebSocketContext)
    const ws = useRef<WebSocketData | null>(null)

    const messageFormat = useCallback((msgContent: string) => {
        const msg = JSON.stringify({
            target: target_id,
            content: msgContent,
            from: '1'
        })
        return msg
    }, [target_id])

    const sendWsMsg = useCallback((msg: string) => {
        if (ws) {
            ws.current?.wsInstance?.send(messageFormat(msg))
        }
    }, [messageFormat])

    useEffect(() => {
        if (user_id && target_id) {
            setRoomId(user_id > target_id ? user_id + target_id : target_id + user_id)
        }
        if (user_id && !target_id) {
            setRoomId(user_id)
        }
    }, [target_id, user_id])

    useEffect(() => {
        ws.current = wsStore.handleWsConnect(roomId)
    }, [roomId, wsStore])

    return { sendWsMsg, ...{ messageList: ws.current?.messageList } }
}

export default useWebSocket