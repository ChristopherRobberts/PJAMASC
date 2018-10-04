const express = require('express');
const router = express.Router();
const controller = require("../Controller/Controller");
const multer = require('multer');
const path = require('path');
const util = require('util');

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

router.post('/addItem', function (req, res) {
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

router.post('/edit-description', function (req, res) {
    if (!req.session.ID) {
        res.json("not logged in");
        return;
    }

    const {
        sku,
        description
    } = req.body;

    controller.updateItemDescription(sku, req.session.ID, description, function (result) {
        res.json(result);
    })
});

router.post('/editSKU', function (req, res) {
        if (!req.session.ID) {
            res.json("you must be logged in to edit.");
        }

        const {
            sku,
            newSku
        } = req.body;

        controller.updateItemSKU(sku, req.session.ID, newSku, function (data) {
            res.json(data);
        });
    }
);

router.post('/editQuantity', function (req, res) {
    if (!req.session.ID) {
        res.json("you must be logged in to edit");
    }

    const {
        sku,
        amount
    } = req.body;

    controller.updateItemQuantity(sku, req.session.ID, amount, function (data) {
        res.json(data);
    })
});


router.post('/edit-name', function (req, res) {
    if (!req.session.ID) {
        res.json("not logged in");
        return;
    }

    const {
        sku,
        product
    } = req.body;

    controller.updateItemName(sku, req.session.ID, product, function (result) {
        res.json(result);
    });
});

router.post('/edit-image', function (req, res) {
    if (!req.session.ID) {
        res.json("not logged in");
        return;
    }

    const {
        sku,
        path
    } = req.body;

    controller.updateItemImage(sku, req.session.ID, path, function (result) {
        res.json(result);
    })
});

const storage = multer.diskStorage({
    destination: "../public/images",
    filename: function (req, file, callback) {
        callback(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    fileFilter: function (req, file, callback) {
        checkFileType(file, callback);
    }
}).single("profileImage"); //Field name and max count

function checkFileType(file, callback) {
    const fileTypes = /jpeg|jpg|png|gif/;
    const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimeType = fileTypes.test(file.mimetype);
    if (mimeType && extName) {
        return callback(null, true)
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

module.exports = router;