const express = require('express');
const router = express.Router();
const controller = require("../Controller/Controller");
/* log in page */
router.post('/login', function(req, res ) {
    const userName = req.body.userName;
    const password = req.body.password;
    controller.login(userName, password, function(result) {
        if (result.loginSuccess) {
            req.session.userName = userName;
            req.session.ID = result.userID;
            res.redirect('/dashboard');
        } else {
            res.redirect('/');
        }
    });
});

module.exports = router;