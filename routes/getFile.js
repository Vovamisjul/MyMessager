const express = require('express');
const router = express.Router();
const fs = require('fs');
const conversationDAO = require('./../messager/DAO/ConversationDAO');
const jwtProvider = require("../jwt/JWTProvider");

router.get('/', async function(req, res, next) {
    try {
        jwtProvider.checkJWT(req.query.token);
    } catch (e) {
        res.status(401).end();
    }
    let {file, file_name} = await conversationDAO.getFile(req.query.messageId);
    let fullName = `uploads/${file_name}`;
    fs.writeFile(fullName, file, (err) => {
        res.download(fullName, file_name, err => {
            if (!err) {
                fs.unlinkSync(fullName);
            }
        })
    });
});

module.exports = router;
