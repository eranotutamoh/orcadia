var express = require('express');
var router = express.Router();

var jwt = require('express-jwt');
var auth = jwt({
    secret: process.env.JWT_SECRET,
    userProperty: 'payload'
});

var ctrlPages = require('../controllers/pages');
//var ctrlUsers = require('../controllers/users');

router.get('/pages', ctrlPages.pages);
router.get('/page/:pageId', ctrlPages.getPage);
router.post('/pageadd', ctrlPages.addPage);
//router.post('/register', ctrlUsers.register);
//router.post('/login', ctrlUsers.login);


module.exports = router;