import { makeAutoObservable } from "mobx"
import { Message, WebSocketData } from "./model"

export class WebSocketStore {
    constructor() {
        makeAutoObservable(this)
    }

    webSocketPool = new Map<number, WebSocketData>()//websocket连接池

    handleWsConnect = (room_id: number) => {
        let wsData = this.webSocketPool.get(room_id)
        // 避免重复连接，先检查连接池中是否已存在该room_id
        if (wsData) {
            return { wsInstance: wsData.wsInstance, messageList: wsData.messageList }
        } else {
            wsData = {
                wsInstance: new WebSocket(import.meta.env.VITE_SCOKET_DOMAIN + room_id),
                messageList: []
            }
            if (wsData.wsInstance) {
                wsData.wsInstance.onopen = function () {
                    console.log('connected')
                }
                wsData.wsInstance.onclose = function () {
                    console.log('unconnect')
                }
                wsData.wsInstance.onmessage = (ev: MessageEvent) => {
                    this.updateMessageList(room_id, ev.data)
                }
                this.webSocketPool.set(room_id, wsData)
            }
            return wsData
        }
    }

    updateMessageList(room_id: number, data: string) {
        const msgData: Message = JSON.parse(data)
        const wsData = this.webSocketPool.get(room_id)
        if (wsData) {
            wsData.messageList.push(msgData)
            this.webSocketPool.set(room_id, wsData)
        }
    }
}