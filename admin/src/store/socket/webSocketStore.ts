import { makeAutoObservable } from "mobx"
import { Message } from "./model"
import { RootStore } from "../rootStore"

export class WebSocketStore {
    constructor(root: RootStore) {
        this.#root = root
        makeAutoObservable(this)
    }
    #root: RootStore
    wsInstance: WebSocket | null = null
    messageBuffer = new Map<number, Message>//消息缓冲区

    wsInit = (token: string): WebSocket => {
        if (!this.wsInstance) {
            this.wsInstance = new WebSocket(import.meta.env.VITE_SCOKET_DOMAIN + token)
            if (this.wsInstance) {
                this.wsInstance.onopen = function () {
                    console.log('user connected')
                }
                this.wsInstance.onclose = function () {
                    console.log('unconnect')
                }
                this.wsInstance.onmessage = (ev: MessageEvent) => {
                    const data: Message = JSON.parse(ev.data);
                    if (data.messageType === "CHAT_MESSAGE") {
                        this.#root.messageRecordStore.addMessage(data.user_id, data)
                    }
                    console.log(data)

                    //收到发送成功的回执之后，把消息加入聊天记录集合
                    if (data.messageType === "RECEIPT") {
                        const res = this.messageBuffer.get(data.id)
                        if (res) {
                            this.#root.messageRecordStore.addMessage(res.user_id, res)
                        }
                    }
                }
            }
            return this.wsInstance
        }
        console.log("已初始化")
        return this.wsInstance
    }

    sendMessage = (user_id: number, msgContent: string) => {
        if (this.wsInstance) {
            const msg: Message = {
                id: 1 + new Date().getTime(),
                messageType: "CHAT_MESSAGE",
                user_id: Number(user_id),
                user_name: "user1",
                content: msgContent,
                staff_id: 1,
                type: "text",
                time: 0,
                isread: true,
                target_id: user_id
            }
            const msgJSON = JSON.stringify(msg)
            this.wsInstance.send(msgJSON)
            this.messageBuffer.set(msg.id, msg)
        }
    }
}