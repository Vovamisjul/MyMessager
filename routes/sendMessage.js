var express = require('express');
var router = express.Router();
var userDAO = require('./../messager/DAO/UserDAO');

router.post('/', async function (req, res, next) {
    console.log(JSON.stringify(req.body.message.file));
    res.send(await userDAO.sendMessage(req.body.username, req.body.conversationId, req.body.message.text, req.body.message.file));
});

module.exports = router;
