import { useCallback, useContext, useEffect, useRef, useState } from "react"
import SocketContext from "@/store/socket/messageContext";

const useSocket = (target_id: number) => {
    const room_id = Number(1 > target_id ? target_id + '' + 1 : target_id + '' + 1);
    const msgStore = useContext(SocketContext)
    const ws = useRef<WebSocket | null>(null)

    const handleMessage = useCallback(
        (ev: { data: string }) => {
            msgStore.updateMessageList(room_id, ev.data)
            console.log(msgStore.messageList[room_id])
        }, [msgStore, room_id]
    )

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
            ws.current?.send(messageFormat(target_id, msg))
        }
    }, [messageFormat, target_id])

    useEffect(() => {
        ws.current = new WebSocket(import.meta.env.VITE_SCOKET_DOMAIN + room_id)
        ws.current.onopen = function () {
            console.log('connected')
        }
        ws.current.onclose = function () {
            console.log('unconnect')
        }
        ws.current.onmessage = handleMessage

    }, [handleMessage, msgStore?.messageList, room_id])

    return { sendWsMsg, ...{ messageList: msgStore.messageList[room_id] } }
}

export default useSocket