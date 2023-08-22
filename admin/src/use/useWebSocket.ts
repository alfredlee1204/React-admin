import { useCallback, useContext, useEffect, useRef, useState } from "react"
import WebSocketContext from "@/store/socket/webSocketContext";
import { WebSocketData } from "@/store/socket/model";

const useWebSocket = (target_id: number) => {
    const room_id = Number(1 > target_id ? target_id + '' + 1 : target_id + '' + 1);
    const wsStore = useContext(WebSocketContext)
    const ws = useRef<WebSocketData>(wsStore.handleWsConnect(room_id))

    const messageFormat = useCallback((target: number, msgContent: string) => {
        const msg = JSON.stringify({
            target: target,
            content: msgContent,
            from: 1
        })
        return msg
    }, [])

    const sendWsMsg = useCallback((msg: string) => {
        if (ws) {
            ws.current?.wsInstance?.send(messageFormat(target_id, msg))
        }
    }, [messageFormat, target_id])

    return { sendWsMsg, ...{ messageList: ws.current.messageList } }
}

export default useWebSocket