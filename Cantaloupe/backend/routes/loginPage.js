const express = require('express');
const router = express.Router();
const controller = require("../Controller/Controller");
/* log in page */
router.post('/login', function(req, res) {
    const userName = req.body.userName;
    const password = req.body.password;
    controller.login(userName, password, function(result) {
        if (result.loginSuccess) {
            req.session.userName = userName;
            req.session.ID = result.userID;
            res.status(200);
            res.json(result.userID);
        } else {
            res.status(400);
            res.json("bad password");
        }
    });
});

module.exports = router;