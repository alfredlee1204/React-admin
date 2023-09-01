import { makeAutoObservable } from "mobx"
import { Conversation, Message } from "../socket/model"

export class MessageRecordStore {
    constructor() {
        makeAutoObservable(this)
    }

    messageMap: Map<string, Message[]> = new Map()
    conversationList: Conversation[] = []

    // 从缓存提取历史聊天记录
    getMessageDataFromLocal = () => {
        console.log(this.messageMap)
        const json = localStorage.getItem('messageData')
        if (json) {
            const data = JSON.parse(json)
            this.messageMap = new Map(Object.entries(data))
        }
    }

    // 把聊天记录存到本地
    saveMessageData = () => {
        if (this.messageMap) {
            const json = JSON.stringify(Object.fromEntries(this.messageMap));
            localStorage.setItem('messageData', json)
        }
    }

    getMessageData = (user_id: string) => {
        return this.messageMap.get(user_id)
    }

    addMessage = (user_id: number, message: Message) => {
        const arr = this.messageMap.get(user_id.toString())
        if (arr) {
            arr?.push(message)
            this.messageMap.set(user_id.toString(), arr)
        } else {
            this.messageMap.set(user_id.toString(), [message])
        }
        this.setConversationList()
    }

    // 会话列表(侧边栏)
    setConversationList = () => {
        const arr = []
        for (const [, value] of this.messageMap) {
            value[value.length - 1]
            const item = {
                lastMessage: value[value.length - 1].content,
                time: value[value.length - 1].time,
                unreadCount: this.countUnread(value),
                user_id: value[value.length - 1].from,
                user_name: value[value.length - 1].from_user_name,
                avatar: ''
            }
            arr.push(item)
            arr.sort(this.sortByTime)
        }
        this.conversationList = arr
    }

    countUnread = (messageArr: Message[]) => {
        const count = messageArr.reduce((count, item) => {
            if (item['isread'] === false) {
                return count + 1;
            }
            return count;
        }, 0);
        return count
    }

    sortByTime = (item_a: Conversation, item_b: Conversation) => {
        return (item_a.time - item_b.time)
    }
}