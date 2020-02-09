var express = require('express');
var router = express.Router();

router.post('/', function(req, res, next) {
    res.send({
        user: {
            username: "ImANewUser"
        },
        jwt: "aaaaaaa.bbbbbbbb.ccccccc"
    });
});

module.exports = router;
