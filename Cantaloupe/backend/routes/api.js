let express = require('express');
let router = express.Router();

router.get('/getItems', function(req, res) {
    console.log('Yay! getItems call received.');
    //controller.getItems(owner, function() {});
});

router.get('/addItem', function(req, res) {
    console.log('Yay! addItem call received.');
    //controller.addItem(sku, name, owner, description, image, quantity, function() {});
});

router.get('/editDescription', function(req, res) {
    console.log('Yay! editDescription call received.');
    //controller.updateItemDescription(sku, owner, newDes, function() {});
});

router.get('/editImage', function(req, res) {
    console.log('Yay! editImage call received.');
    //controller.updateItemImage(sku, owner, newImage, function() {});
});

router.get('/editProductName', function(req, res) {
    console.log('Yay! editProductName call received.');
    //controller.updateItemName(sku, owner, newDes, function() {});
});

router.get('/deleteItem', function(req, res) {
    console.log('Yay! deleteItem call received.');
    //controller.updateItemName(sku, owner, newDes, function() {});
});

module.exports = router;