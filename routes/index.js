var express = require('express');
var router = express.Router();
var io = require("../io");

/* GET home page. */
router.get('/', function (req, res) {
    res.sendfile('index.html', {root: './public'});
});

module.exports = router;
