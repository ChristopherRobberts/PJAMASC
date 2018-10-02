const express = require('express');
const router = express.Router();
const session = require("express-session");
const controller = require("../Controller/Controller");

router.post('/', function(req, res) {
    if (!req.session.userName) {
        res.status(401);
        res.redirect("/login");
        return;
    }
    const {
        sku,
        name,
        description,
        image,
        quantity
    } = req.body;
    controller.addItem(sku, name, req.session.ID, description, image, quantity, (result) => {
        res.json(result);
    })
});

module.exports = router;