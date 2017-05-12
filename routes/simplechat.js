var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
	res.render('simplechat', { title: 'Simple Chat Test - Sun' });
});

module.exports = router;
