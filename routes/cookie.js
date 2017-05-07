var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
	res.cookie('username','Sun Kim, 김선중'
			, { expires: new Date(Date.now() + 2 * 60 * 60 * 1000), httpOnly: true, signed: true });
	
	res.send('cookie username : ' + req.signedCookies.username);
	
	console.log(req.cookies);
	console.log(req.signedCookies);
});

module.exports = router;
