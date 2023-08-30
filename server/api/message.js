const express = require("express")
const router = express.Router()

// 聊过天的用户（左侧消息列表）
router.get('/messageList', (req, res) => {
    const { user_id } = req.body;

    const msgList = [{
        id: 1,
        lastMessage: '你好，请问你家的产品包邮吗',
        time: new Date().getTime(),
        isread: false,
        unreadCount: 28,
        user_id: '2',
        user_name: '用户23423',
        avatar: ''
    }, {
        id: 2,
        lastMessage: '你好，请问你家的产品包邮吗',
        time: new Date().getTime(),
        isread: false,
        unreadCount: 28,
        user_id: '3',
        user_name: '用户23423',
        avatar: ''
    }, {
        id: 3,
        lastMessage: '你好，我想退货',
        time: new Date().getTime(),
        isread: false,
        unreadCount: 28,
        user_id: '4',
        user_name: '用户23423',
        avatar: ''
    }, {
        id: 4,
        lastMessage: '你好，咱们聊聊',
        time: new Date().getTime(),
        isread: false,
        unreadCount: 789,
        user_id: '5',
        user_name: '用户23423',
        avatar: ''
    }]
    res.send({
        status: 200,
        msg: 'success',
        data: msgList
    })
})

module.exports = router
