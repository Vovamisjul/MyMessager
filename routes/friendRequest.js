var express = require('express');
var router = express.Router();
var userDAO = require('./../messager/DAO/UserDAO');

router.post('/', async function (req, res, next) {
    await userDAO.sendFriendRequest(req.body.username, req.body.friendUsername);
    res.send({});
});

module.exports = router;
