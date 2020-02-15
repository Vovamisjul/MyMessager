var express = require('express');
var router = express.Router();
var conversationDAO = require('./../messager/DAO/ConversationDAO');
const multer  = require("multer");
const fs = require("fs");
var upload = multer({ dest: 'uploads/' });
var path = require('path');

router.put('/', upload.single('file'),async function(req, res, next) {
    let filename = req.file.filename;
    let filePath = path.join("uploads", filename);
    const file = fs.readFileSync(filePath);
    const buf = new Buffer(file);
    res.send(await conversationDAO.addFile(req.query.messageId, buf));
    fs.unlinkSync(filePath);
    //res.sendStatus(200);
});

module.exports = router;
