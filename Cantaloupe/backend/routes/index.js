const express = require('express');
const router = express.Router();
const session = require("express-session");
const controller = require("../Controller/Controller");
/* GET home page. */
router.get('/', function(req, res) {
    controller.getUserInfo("JYSK", "123456", function(result) {
        req.session.userName = result[0][0].name;
        req.session.avatar = result[0][0].avatar;
        req.session.userID = result[0][0].id;
        res.send('Returning with some text');
    });
});

module.exports = router;
