const express = require('express');
const router = express.Router();
const controller = require("../Controller/Controller");

router.post('/addItem', function (req, res) {
    if (!req.session.userName) {
        res.status(401);
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

module.exports = router;