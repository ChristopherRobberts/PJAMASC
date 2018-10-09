const express = require('express');
const router = express.Router();
const controller = require("../Controller/Controller");
const multer = require('multer');
const path = require('path');
const util = require('util');

const isLoggedIn = (req) => req.session.ID;

/**
 * This router is mainly used for the ajax requests from client.
 */

/**
 * Middleware to check if user is logged in or not. If the user is not logged in, the request will be redirected to
 * the log in page.
 */
router.use(function (req, res, next) {
    if (isLoggedIn(req)) {
        return next();
    }

    res.redirect('/');
});

/* Remove an item */
router.post('/deleteItem', function (req, res) {
    const sku = req.body.sku;
    controller.deleteItem(sku, req.session.ID, function (result) {
        res.json(result);
    })
});

/**
 * Respond with a list of all items owned by a user.
 */
router.get('/getAllItems', function (req, res) {
    controller.getItems(req.session.ID, function (data) {
        res.json(data[0]);
    });
});

/**
 * Change description of an item.
 */
router.post('/edit-description', function (req, res) {
    const {
        sku,
        description
    } = req.body;

    controller.updateItemDescription(sku, req.session.ID, description, function (result) {
        res.json(result);
    })
});

/**
 * Change SKU of an item.
 */
router.post('/editSKU', function (req, res) {
        const {
            sku,
            newSku
        } = req.body;

        controller.updateItemSKU(sku, req.session.ID, newSku, function (data) {
            res.json(data);
        });
    }
);

/**
 * Change Quantity of an item.
 */
router.post('/editQuantity', function (req, res) {
    const {
        sku,
        amount
    } = req.body;

    controller.updateItemQuantity(sku, req.session.ID, amount, function (data) {
        res.json(data);
    })
});

/**
 * Change name of an item.
 */
router.post('/edit-name', function (req, res) {
    const {
        sku,
        product
    } = req.body;

    controller.updateItemName(sku, req.session.ID, product, function (result) {
        res.json(result);
    });
});

/**
 * Change image of an item.
 */
router.post('/edit-image', function (req, res) {
    const {
        sku,
        path
    } = req.body;

    controller.updateItemImage(sku, req.session.ID, path, function (result) {
        res.json(result);
    })
});

/**
 * Define path where the uploaded file should be stored, and file name.
 */
const storage = multer.diskStorage({
    destination: "../public/images",
    filename: function (req, file, callback) {
        callback(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
    }
});

/**
 * Module used for handling multipart/form-data (item image button).
 */
const upload = multer({
    storage: storage,
    fileFilter: function (req, file, callback) {
        checkFileType(file, callback);
    }
}).single("profileImage"); //Field name and max count

/**
 * Checks if the given file is an image.
 */
function checkFileType(file, callback) {
    const fileTypes = /jpeg|jpg|png|gif/;
    const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimeType = fileTypes.test(file.mimetype);
    if (mimeType && extName) {
        return callback(null, true);
    } else {
        callback('Error: Images only!');
    }
}

router.post('/fileUpload', function (req, res) {
    upload(req, res, function (err) {
        if (err) {
            res.render('dashboard', {msg: err});
        } else {
            if (req.file === undefined) {
                res.json("error")
            } else {
                const path = (req.file.destination + '/' + req.file.filename);
                const imageToDatabase = path.substr(9, path.length);
                controller.updateItemImage(req.body.sku, req.session.ID, imageToDatabase, function (status) {
                    res.json(status);
                })
            }
        }
    });
});

router.post('/addItem', function (req, res) {
    upload(req, res, function (err) {
        if (err) {
            res.render('dashboard', {msg: err});
        } else {
            if (req.file === undefined) {
                res.json("error")
            } else {
                const path = (req.file.destination + '/' + req.file.filename);
                const imageToDatabase = path.substr(9, path.length);

                controller.addItem(req.body.sku, req.body.name, req.session.ID, req.body.description, imageToDatabase, req.body.amount, function (result) {
                    res.json(result);
                });
            }
        }
    });
});

module.exports = router;