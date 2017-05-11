var express = require('express');
var router = express.Router();

var dbpool = require('../custom_modules/dbpool');


router.get('/selectall', function(req, res, next) {
	dbpool.query('select * from test_user ', function(err,rows) {
		//console.log(rows);
		res.json(rows);
	});
});

router.get('/selectsome', function(req, res, next) {
	dbpool.query('select * from test_user where userid in (?, ?)', [1, 3], function(err,rows) {
		//console.log(rows);
		res.json(rows);
	});
});

router.get('/select', function(req, res, next) {
	dbpool.query('select * from test_user where userid = ?', [2], function(err,rows) {
		//console.log(rows);
		res.json(rows);
	});
});

router.get('/insert', function(req, res, next) {

	var user = {
			//'userid': 1,		//auto-increment
			'usernm': 'dbpool insert',
			'useraddr': '이상하고 아름다운 도깨비나라'
	};

	dbpool.query('insert into test_user set ?', user, function(err,result) {
		user.success = 1;
		user.error = '';
		res.json(user);
	});
});

module.exports = router;
