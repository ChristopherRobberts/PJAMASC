let express = require('express');
let router = express.Router();
let controller = require('../Controller/Controller.js');


/* GET home page. */
router.get('/', function(req, res) {
    res.render('login');
});

/* Trying to log in */
router.post('/dashboard', function(req, res) {
    let username = req.body.uname;
    let password = req.body.pword;

    controller.login(username, password, function(result){
        if(result.loginSuccess){
            req.session.username = result.username;
            req.session.password = password;
            console.log('going to dashboard');
            res.render('dashboard', { 'username': req.session.username, 'password': req.session.password});
        } else {
            console.log('going to login');
            res.render('login');
        };
    });
});

router.post('/logout', function(req, res){
    req.session.username = null;
    req.session.password = null;
    res.render('login');
})

router.get('/logout', function(req, res){
    res.render('login');
})

module.exports = router;
