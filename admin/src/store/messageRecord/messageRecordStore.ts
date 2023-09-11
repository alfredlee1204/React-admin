import { computed, makeAutoObservable } from "mobx"
import { Conversation, Message } from "../socket/model"

export class MessageRecordStore {
    constructor() {
        makeAutoObservable(this)
    }

    messageMap: Map<string, Message[]> = new Map()//消息记录
    activeRoom = -1;//当前活跃的房间

    // 从缓存提取历史聊天记录
    getMessageDataFromLocal = () => {
        console.log('读取本地聊天记录', this.messageMap)
        const json = localStorage.getItem('messageData')
        if (json) {
            const data = JSON.parse(json)
            this.messageMap = new Map(Object.entries(data))
        }
    }

    // 把聊天记录存到本地
    saveMessageData = () => {
        if (this.messageMap.size > 0) {
            const json = JSON.stringify(Object.fromEntries(this.messageMap));
            localStorage.setItem('messageData', json)
            this.messageMap.clear()
            console.log(this.messageMap)
        }
    }

    // 获取客户的消息
    getMessageData = (user_id: number) => {
        return this.messageMap.get(user_id.toString())
    }

    // 添加消息
    addMessage = (user_id: number, message: Message) => {
        const arr = this.messageMap.get(user_id.toString())
        if (arr) {
            if (this.activeRoom === user_id) {
                message.isread = true
            }
            console.log(message)
            arr?.push(message)
            this.messageMap.set(user_id.toString(), arr)
        } else {
            this.messageMap.set(user_id.toString(), [message])
        }
    }

    // 会话列表(侧边栏)
    conversationList = computed(() => {
        const arr: Conversation[] = []
        for (const [, value] of this.messageMap) {
            const msgData = value[value.length - 1]
            const item = {
                lastMessage: msgData.content,
                time: msgData.time,
                unreadCount: this.countUnread(value),
                user_id: msgData.user_id,
                user_name: msgData.user_name,
                avatar: ''
            }
            arr.push(item)
            arr.sort(this.sortByTime)
        }
        return arr
    })

    //计算未读消息
    countUnread = (messageArr: Message[]) => {
        const count = messageArr.reduce((count, item) => {
            if (item['isread'] === false) {
                return count + 1;
            }
            return count;
        }, 0);
        return count
    }

    // 消息已读
    readMsg = (user_id: number) => {
        if (user_id) {
            this.activeRoom = user_id
            const res = this.getMessageData(user_id)
            if (res) {
                for (const item of res) {
                    item.isread = true
                }
            }
            for (const item of this.conversationList.get()) {
                if (item.user_id === user_id) {
                    item.unreadCount = 0
                }
            }
        }
    }

    // 根据时间对会话列表进行排序
    sortByTime = (item_a: Conversation, item_b: Conversation) => {
        return (item_a.time - item_b.time)
    }
}