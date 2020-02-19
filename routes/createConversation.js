var express = require('express');
var router = express.Router();
const conversationDAO = require('./../messager/DAO/ConversationDAO');

router.post('/', async function (req, res, next) {
    res.send(await conversationDAO.createConversation(req.body.name, req.body.users));
});

module.exports = router;
