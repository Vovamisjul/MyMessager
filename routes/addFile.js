var express = require('express');
var router = express.Router();
var conversationDAO = require('./../messager/DAO/ConversationDAO');
const multer  = require("multer");
const fs = require("fs");
var upload = multer({ dest: 'uploads/' });
var path = require('path');

const storageConfig = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, "uploads");
    },
    filename: (req, file, cb) =>{
        let fileId = conversationDAO.addFile(file.originalname, req.query.messageId);
        cb(null, file.originalname + fileId);
    }
});


router.put('/',async function(req, res, next) {

});

module.exports = router;
