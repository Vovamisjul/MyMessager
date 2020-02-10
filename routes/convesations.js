var express = require('express');
var router = express.Router();
var userDAO = require('./../messager/DAO/UserDAO');

router.post('/', async function(req, res, next) {
    res.send(await userDAO.getConversations(req.body));
});

module.exports = router;
