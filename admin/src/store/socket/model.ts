export type Message = {
    id: string,
    type: 'text' | 'image' | 'video'
    content: string,
    from: number,
    target: number,
    time: string
}

export type WebSocketData = {
    wsInstance: WebSocket | null,
    messageList: Message[]
}

