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
                    if (data.messageType === "CHAT_MESSAGE")
                        console.log(data)
                    this.#root.messageRecordStore.addMessage(data.user_id, data)
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
            this.#root.messageRecordStore.addMessage(user_id, msg)
        }
    }
}