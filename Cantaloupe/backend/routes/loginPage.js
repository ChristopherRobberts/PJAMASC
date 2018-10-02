const express = require('express');
const router = express.Router();
const session = require("express-session");
const controller = require("../Controller/Controller");
/* log in page */
router.post('/login', function(req, res) {
    const userName = req.body.userName;
    const password = req.body.password;
    const userID = checkLogin(userName, password);
    if (userID) {
        req.session.userName = userName;
        req.session.ID = userID;
        res.status(200);
        res.redirect('/');
    } else {
        res.status(400);
        res.json("bad password");
    }
});

const checkLogin = (userName, password) => 5;

module.exports = router;