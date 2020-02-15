const express = require('express');
const router = express.Router();
const conversationDAO = require('./../messager/DAO/ConversationDAO');

router.get('/', async function(req, res, next) {
    res.send(await conversationDAO.getConversations(req.query.username));
});

module.exports = router;
