const express = require('express');
const router = express.Router();
const userDAO = require('./../messager/DAO/UserDAO');
const jstProvider = require("../jwt/JWTProvider");

router.post('/', async function (req, res, next) {
    if (await userDAO.checkUser(req.body.username, req.body.password)) {
        res.send({
            user: {
                username: req.body.username
            },
            jwt: jstProvider.createJWT( {
                username: req.body.username
            })
        });
    }
    else {
        res.status(403).end();
    }
});

module.exports = router;
