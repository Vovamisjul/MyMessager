var express = require('express');
var router = express.Router();
var userDAO = require('./../messager/DAO/UserDAO');

router.get('/', async function(req, res, next) {
    res.send(await userDAO.getConversations(req.query.username));
});

module.exports = router;
