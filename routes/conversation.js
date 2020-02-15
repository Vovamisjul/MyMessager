const express = require('express');
const router = express.Router();
const conversationDAO = require('./../messager/DAO/ConversationDAO');

router.get('/', async function(req, res, next) {
    res.send(await conversationDAO.getConversation(req.query.id, req.query.page));
});

module.exports = router;
