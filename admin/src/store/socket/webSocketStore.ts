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
    wsInit(token: string): WebSocket {
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
                    this.#root.messageRecordStore.addMessage(data.from, data)
                }
            }
            return this.wsInstance
        }
        console.log("已初始化")
        return this.wsInstance
    }

    sendMessage(target_id: number,msgContent: string) {
        if(this.wsInstance){
            const msg = JSON.stringify({
                target: target_id,
                content: msgContent,
                from: '1'
            })
            this.wsInstance.send(msg)
        }
    }
}