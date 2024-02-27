var express = require('express');
const AuthController = require('../src/controllers/AuthController');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Express' });
});
router.post('/login', AuthController.login);

module.exports = router;
