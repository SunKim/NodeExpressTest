var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
	var ua = req.headers['user-agent'];
	var cc = req.headers['cache-control'];
	res.send('request header정보.<br>' 
			+ 'User Agent : ' + ua + '<br>'
			+ 'Cache Control : ' + cc + '<br>'
			);
	console.log(req.headers);
});


router.get('/response', function(req, res, next) {
	res.writeHead(403);
	res.end();
});


module.exports = router;
