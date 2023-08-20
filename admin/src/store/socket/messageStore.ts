import { makeAutoObservable } from "mobx"
import { Message } from "./model"

export class MessageStore {
    constructor() {
        makeAutoObservable(this)
    }

    messageList: Message[][] = []

    updateMessageList(room_id: number, data: string) {
        const msgData: Message[] = JSON.parse(data)
        if (this.messageList[room_id]) {
            this.messageList[room_id] = msgData
        } else {
            this.messageList[room_id] = msgData
        }
    }
}