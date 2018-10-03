const express = require('express');
const router = express.Router();
const controller = require("../Controller/Controller");

router.post('/deleteItem', function (req, res) {
    if (!req.session.userName) {
        res.status(401);
        return;
    }
    const sku = req.body.sku;
    controller.deleteItem(sku, req.session.ID, function (result) {
        res.json(result);
    })
});

router.get('/getAllItems', function (req, res) {

    if (!req.session.ID) {
        res.json("failure");
        return;
    }
    controller.getItems(req.session.ID, function (data) {
        res.json(data[0]);
    });
});

router.post('/addItem', function(req, res) {
    if (!req.session.ID) {
        res.json("not logged in");
        return;
    }
    const {
        sku,
        name,
        description,
        image,
        amount
    } = req.body;
    controller.addItem(sku, name, req.session.ID, description, image, amount, function (result) {
        res.json(result);
    });
});

module.exports = router;