var express = require('express');
const jwtProvider = require("../jwt/JWTProvider");
var router = express.Router();

router.post('/', async function(req, res, next) {
    try {
        res.send(jwtProvider.refreshToken(req.body.refreshToken));
    }
    catch (e) {
        console.log(e);
        res.status(401).end();
    }
});

module.exports = router;
