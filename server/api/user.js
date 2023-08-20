const express = require("express")
const router = express.Router()

router.post('/login', (req, res) => {
    const { username, password } = req.body;
    res.send({
        status: 200,
        msg: 'success',
        data: body
    })
})

router.get('/login', (req, res) => {
    const { username, password } = req.body;
    res.send({
        status: 200,
        msg: 'success',
        data: body
    })
})

module.exports = router