const express = require('express');
const router = express.Router();
const userDAO = require('./../messager/DAO/UserDAO');

router.get('/', async function(req, res, next) {
    res.send(await userDAO.getFriends(req.query.username));
});

module.exports = router;
