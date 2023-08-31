export type Message = {
    id: string,
    type: 'text' | 'image' | 'video'
    content: string,
    from: number,
    target: number,
    time: number
}

export type Conversation = {
    id: string,
    lastMessage: string,
    time: string,
    unreadCount: number,
    user_id: string,
    user_name: string,
    avatar: ''
}

