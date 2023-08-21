import { makeAutoObservable } from "mobx"
import { Message } from "./model"

export class MessageStore {
    constructor() {
        makeAutoObservable(this)
    }

    messageList = new Map<number, Message[]>()

    updateMessageList(room_id: number, data: string) {
        const msgData: Message = JSON.parse(data)
        const old_data = this.messageList.get(room_id)
        if (old_data) {
            old_data.push(msgData)
            this.messageList.set(room_id, old_data)
        } else {
            this.messageList.set(room_id, [...[msgData]])
        }
    }
}