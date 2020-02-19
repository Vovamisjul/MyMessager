var express = require('express');
var router = express.Router();
var userDAO = require('./../messager/DAO/UserDAO');

router.post('/', async function (req, res, next) {
    res.send(await userDAO.sendMessage(req.body.username, req.body.conversationId, req.body.text));
});

module.exports = router;
