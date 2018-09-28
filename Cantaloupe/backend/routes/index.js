var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();

router.use(bodyParser.urlencoded({ extended: true}));

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login');
});

router.get('/dashboard', function(req, res, next) {
  res.render('dashboard');
});

router.post('/dashboard', function(req, res) {
    var username = req.body.uname;
    var password = req.body.pword;
    // Need to make a call to the controller to check if the user exists in the db
    res.render('dashboard', { 'username': username, 'password': password});
});

module.exports = router;
