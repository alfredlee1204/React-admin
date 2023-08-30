export type Message = {
    id: string,
    type: 'text' | 'image' | 'video'
    content: string,
    from: string,
    target: string,
    time: string
}

export type WebSocketData = {
    wsInstance: WebSocket | null,
    messageList: Message[]
}

export type SiderMessage = {
    id: string,
    lastMessage: string,
    time: string,
    isread: boolean,
    unreadCount: number,
    user_id: string,
    user_name: string,
    avatar: ''
}

