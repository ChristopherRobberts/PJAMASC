const express = require('express');
const router = express.Router();
const controller = require("../Controller/Controller");

/* log in page */
router.post('/login', function(req, res) {
    const userName = req.body.userName;
    const password = req.body.password;
    controller.login(userName, password, function(result) {
        if (result.loginSuccess) {
            req.session.userName = result.username;
            req.session.ID = result.userID;
            req.session.avatar = result.avatar;
            res.render('dashboard');
        } else {
            res.redirect('/');
        }
    });
});

router.get('/login', function (req, res) {
    if (req.session.userName) {
        console.log(req.session.userName);
        res.render('dashboard');
        return;
    }

    res.redirect('/');
});
router.get('/getProfileImage', function (req, res) {
    res.send(req.session.avatar);
});

router.get('/getUserName', function (req, res) {
    res.send(req.session.userName);
});

module.exports = router;