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
                        this.#root.messageRecordStore.addMessage(data.from, data)
                }
            }
            return this.wsInstance
        }
        console.log("已初始化")
        return this.wsInstance
    }

    sendMessage = (target_id: number | string, msgContent: string) => {
        if (this.wsInstance) {
            const msg: Message = {
                messageType: "CHAT_MESSAGE",
                target: target_id,
                content: msgContent,
                from: 1,
                type: "text",
                from_user_name: "user1",
                time: 0,
                isread: true
            }
            const msgJSON = JSON.stringify(msg)
            this.wsInstance.send(msgJSON)
            this.#root.messageRecordStore.addMessage(target_id, msg)
            console.log(target_id)
        }
    }
}