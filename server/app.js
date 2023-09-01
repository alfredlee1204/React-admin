const express = require('express');
const expressWs = require('express-ws') // 引入 WebSocket 包
const http = require('http');
const handleWs = require('./websocket')
const router_message = require('./api/message')
const app = express();
expressWs(app) // 将 WebSocket 服务混入 app，相当于为 app 添加 .ws 方法
const bodyParser = require("body-parser");

// cors 跨域
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With,token,Content-Type");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});


app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api', router_message)
app.ws('/ws/:id', handleWs)
app.listen(8888, () => {
    console.log('listening on *:8888');
});


