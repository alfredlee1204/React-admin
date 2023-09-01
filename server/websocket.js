const wsClients = {}
const MessageType = {
    RECEIPT: 'RECEIPT',//回执
    CHAT_MESSAGE: 'CHAT_MESSAGE',//聊天消息
}
function handleWs(ws, req) {
    wsClients[req.params.id] = { ws };
    ws.on("message", (msg) => {
        if (verifyJSON(msg)) {
            const message = JSON.parse(msg)
            message['time'] = new Date().getTime()
            if (message["messageType"] === MessageType.CHAT_MESSAGE) {
                if (wsClients[message['target']]) {
                    message["isread"]=false;
                    wsClients[message['target']].ws.send(JSON.stringify(message))

                    // 消息回执
                    const receiptMsg = {
                        id:message['id'],
                        messageType: MessageType.RECEIPT,
                        status: 'success'
                    }
                    wsClients[req.params.id].ws.send(JSON.stringify(receiptMsg))
                }
            }
        }
    })
}

function verifyJSON(str) {
    if (typeof str == 'string') {
        try {
            JSON.parse(str);
            return JSON.parse(str);
        } catch (e) {
            return false;
        }
    }
}
module.exports = handleWs