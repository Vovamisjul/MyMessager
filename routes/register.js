var express = require('express');
var router = express.Router();
var userDAO = require('./../messager/DAO/UserDAO');
const jwtProvider = require("../jwt/JWTProvider");

router.post('/', function (req, res, next) {
    if (req.body.password !== req.body.repeatPassword) {
        res.status(400).send({});
    }
    userDAO.registerUser(req.body.username, req.body.password)
        .then(() => {
                res.send({
                    user: {
                        username: req.body.username
                    },
                    jwt: jwtProvider.createJWT( {
                        username: req.body.username
                    })
                });
            },
            () => res.status(403).send({})
        )
    ;
});

module.exports = router;
