var express = require('express');
var router = express.Router();
var userDAO = require('./../messager/DAO/UserDAO');

router.post('/', async function (req, res, next) {
    if (await userDAO.checkUser(req.body.username, req.body.password)) {
        res.send({
            user: {
                username: req.body.username
            },
            jwt: "aaaaaaa.bbbbbbbb.ccccccc"
        });
    }
    else {
        res.status(403).end();
    }
});

module.exports = router;
