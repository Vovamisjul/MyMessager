var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.send({
        user: {
            username: "ImANewUser"
        }
    });
});

module.exports = router;
