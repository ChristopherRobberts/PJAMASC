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

router.post('/edit-description', function(req, res) {
    if (!req.session.ID) {
        res.json("not logged in");
        return;
    }
    console.log(req.body);
    const {
        sku,
        description
    } = req.body;
    controller.updateItemDescription(sku, req.session.ID, description, function (result) {
        res.json(result);
    })
});

router.post('/edit-name', function(req, res) {
    if (!req.session.ID) {
        res.json("not logged in");
        return;
    }

    const {
        sku,
        product
    } = req.body;
    console.log(req.body);
    controller.updateItemName(sku, req.session.ID, product, function (result) {
        res.json(result);
    })
});

router.post('/edit-image', function(req, res) {
    if (!req.session.ID) {
        res.json("not logged in");
        return;
    }

    const {
        sku,
        path
    } = req.body;
    console.log(req.body);
    controller.updateItemImage(sku, req.session.ID, path, function (result) {
        res.json(result);
    })
});
module.exports = router;