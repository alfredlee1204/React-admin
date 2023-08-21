const wsClients = {}

function handleWs(ws, req) {
    // 将连接记录在连接池中
    wsClients[req.params.id] = { ws, msgList: [] };
    ws.on("message", (msg) => {
        if (verifyJSON(msg)) {
            const message = JSON.parse(msg)
            message['time'] = new Date().getTime()
            wsClients[req.params.id].msgList.push(message)
            wsClients[req.params.id].ws.send(JSON.stringify(message))
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