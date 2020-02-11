var express = require('express');
var router = express.Router();
var userDAO = require('./../messager/DAO/UserDAO');

router.post('/', function (req, res, next) {
    if (req.body.password !== req.body.repeatPassword) {
        res.status(400).end();
    }
    userDAO.registerUser(req.body.username, req.body.password)
        .then(() => {
                res.send({
                    user: {
                        username: req.body.username
                    },
                    jwt: "aaaaaaa.bbbbbbbb.ccccccc"
                });
            },
            () => {
                res.status(403).end();
            });
});

module.exports = router;
