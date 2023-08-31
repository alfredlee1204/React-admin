import { makeAutoObservable } from "mobx"
import { Conversation, Message } from "../socket/model"

export class MessageRecordStore {
    constructor() {
        makeAutoObservable(this)
    }
    messageMap: Map<number, Message[]> = new Map()
    conversationList:Conversation[]=[]
    // 从缓存提取历史聊天记录
    getMessageDataFromLocal() {
        const json = localStorage.getItem('messageData')
        if (json) {
          const data = JSON.parse(json)
          this.messageMap = new Map(data)
        }
    }

    getMessageData(user_id:number) {
        return this.messageMap.get(user_id)
    }
    
    addMessage(user_id: number, message: Message) {
        const arr = this.messageMap.get(user_id)
        if (arr) {
            arr?.push(message)
            this.messageMap.set(user_id, arr)
        } else {
            this.messageMap.set(user_id, [message])
        }
    }

    // 会话列表(侧边栏)
    getConversationList() {
        const arr=[]
        for(const [,value] of this.messageMap){
            arr.push(value[value.length-1])
            arr.sort(this.sortByTime)
        }
    }

    sortByTime(item_a:Message,item_b:Message) {
        return (item_a.time - item_b.time)
    }
}