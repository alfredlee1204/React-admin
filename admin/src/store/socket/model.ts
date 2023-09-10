export type Message = {
    messageType: string
    type: 'text' | 'image' | 'video'
    content: string,
    user_id: number,
    user_name: string,
    staff_id: number,
    time: number,
    isread: boolean,
    target_id: number
}

export type Conversation = {
    lastMessage: string,
    time: number,
    unreadCount: number,
    user_id: number,
    user_name: string,
    avatar: string
}

