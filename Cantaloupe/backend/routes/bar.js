var express = require('express');
var router = express.Router();
var session = require("express-session");
/* Testing */
router.get('/', function(req, res, next) {
    let userName = req.session.userName;
    let avatar = req.session.avatar;
    let id = req.session.userID;
    res.send(`You are now logged in as: ${userName}, ${avatar}, ${id}`);
});

module.exports = router;