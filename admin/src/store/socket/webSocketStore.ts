import { makeAutoObservable } from "mobx"
import { Message, SiderMessage, WebSocketData } from "./model"

export class WebSocketStore {
    constructor() {
        makeAutoObservable(this)
    }

    webSocketPool = new Map<string, WebSocketData>()//websocket连接池
    siderMessageList = new Map<string, SiderMessage>()
    userWebsocket: WebSocket | null = null
    userInit(user_id: string) {
        this.userWebsocket = new WebSocket(import.meta.env.VITE_SCOKET_DOMAIN + user_id)
        if (this.userWebsocket) {
            this.userWebsocket.onopen = function () {
                console.log('user connected')
            }
            this.userWebsocket.onclose = function () {
                console.log('unconnect')
            }
            this.userWebsocket.onmessage = (ev: MessageEvent) => {
                const data: Message = JSON.parse(ev.data);

            }
        }
    }

    getSiderMessageList() {
        return this.siderMessageList
    }

    setSiderMessageList(user_id: string, data: SiderMessage) {
        this.siderMessageList.set(user_id, data)
    }

    // 处理websocket连接
    handleWsConnect = (room_id: string) => {
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

    // 更新房间的聊天记录
    updateMessageList(room_id: string, data: string) {
        console.log(data)
        const msgData: Message = JSON.parse(data)
        this.updateSiderMessageList(msgData.target, msgData.content)
        const wsData = this.webSocketPool.get(room_id)
        if (wsData) {
            console.log(this.siderMessageList[0].lastMessage)
            wsData.messageList.push(msgData)
            this.webSocketPool.set(room_id, wsData)
        }
    }

    // 更新侧边消息栏
    updateSiderMessageList(user_id: string, data: Message) {
        const item = this.siderMessageList.get(user_id)
        if (item) {
            item.lastMessage = data.content
            item.unreadCount++
            this.siderMessageList.set(user_id, item)
        } else {
            this.siderMessageList.set(user_id, {
                id: data.id,
                lastMessage: data.content,
                time: data.time,
                isread: false,
                unreadCount: 1,
                user_id: data.from,
                user_name: data.from,
                avatar: ''
            })
        }
    }

    // 消息已读
    readMessage(user_id: string) {
        const index = this.siderMessageList.findIndex(item => item.user_id === user_id)
        if (index > -1) {
            this.siderMessageList[index].unreadCount = 0
        }
    }
}