var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
	res.send('session username : ' + req.session.username);
});

router.get('/write', function(req, res, next) {
	req.session.username = 'Sun Kim';
	res.send('session is written : ' + req.session.username);
});

router.get('/read', function(req, res, next) {
	res.send('session username : ' + req.session.username);
});

module.exports = router;
