let express = require('express');
let router = express.Router();
let controller = require('../Controller/Controller.js');


/* GET home page. */
router.get('/', function (req, res) {
    if (req.session.userName) {
        res.redirect('/dashboard');
    } else {
        res.render('login');
    }
});

router.get('/dashboard', function (req, res) {
    if (req.session.ID) {
        res.render('dashboard');
    }
});
module.exports = router;
