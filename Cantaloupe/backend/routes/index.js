let express = require('express');
let router = express.Router();
let controller = require('../Controller/Controller.js');


/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('login');
});

router.get('/dashboard', function(req, res, next) {
    res.render('dashboard');
});

router.post('/dashboard', function(req, res) {
    let username = req.body.uname;
    let password = req.body.pword;
    if(controller.login(username, password, function(result){
        console.log(result);
    })){
        res.render('dashboard', { 'username': username, 'password': password});
        console.log('advance to dashboard');
    } else {
        res.render('login');
        console.log('advance to login');
    };
    /* Validate login form input
    req.checkBody('username', 'Username is required').notEmpty();
    req.checkBody('password', 'Password is required').notEmpty();

    let errors = req.validationErrors();

    if(errors){

        req.session.errors = errors;
        req.session.success = false;
        res.render('dashboard');

    } else {

        req.session.success = true;
        res.render('/');
    }
    */

    // Need to make a call to the controller to check if the user exists in the db
    //res.render('dashboard', { 'username': username, 'password': password});
});


module.exports = router;
