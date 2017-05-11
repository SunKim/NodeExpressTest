var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var db_config = require('../properties/db_config.json');

//var conn = mysql.createConnection(db_config);
var conn = mysql.createConnection({
	host: db_config.host,
	port: db_config.port,
	user: db_config.user,
	password: db_config.password,
	database: db_config.database
});


/* GET users listing. */
router.get('/insert', function(req, res, next) {

	var user = {
			//'userid': 1,		//auto-increment
			'usernm': 'sjmarine00',
			'useraddr': '경기 오산시 경기대로 227, 712'
	};

	var query = conn.query('insert into test_user set ?', user, function(err,result) {
		if (err) {
			console.error(err);
			throw err;
		}
		//console.log(query);
		console.log(query.sql);
		res.status(200).send('success');	//res.status(status).send(body)
	});
});


router.get('/selectall', function(req,res){
	//where 사용시 escape 처리
	//conn.query('select * from users where userid='+mysql.escape(req.params.userid)
	var query = conn.query('select * from test_user ', function(err,rows) {
		console.log(rows);
		res.json(rows);
	});
	console.log(query.sql);
});

router.get('/select', function(req,res){
	//where 사용시 escape 처리
	//conn.query('select * from users where userid='+mysql.escape(req.params.userid)
	var query = conn.query('select * from test_user where userid = ?', [2], function(err,rows) {
		console.log(rows);
		res.json(rows);
	});
	console.log(query.sql);
});

router.get('/selectsome', function(req,res){
	//where 사용시 escape 처리
	//conn.query('select * from users where userid='+mysql.escape(req.params.userid)
	var query = conn.query('select * from test_user where userid in (?, ?) ', [1, 2], function(err,rows) {
		console.log(rows);
		res.json(rows);
	});
	console.log(query.sql);
});


router.get('/transaction', function(req, res) {
	var user = {
			//'userid': 1,		//auto-increment
			'usernm': 'transaction',
			'useraddr': '은하계 저멀리'
	};
	
	var product = {
			'productnm': '피규어1(transaction)',
			'price': 123000
	};

	conn.beginTransaction(function(err) {
		console.log('=== Transaction Begin ===');
		if (err) {
			throw err;
		}
		
		var query1 = conn.query('insert into test_user set ?', user, function(err,result) {
			if (err) {
				console.error(err);
				conn.rollback(function(){
					console.error('rollback error');
					throw err;
				});
			}
			
			console.log('qry1 : ' + query1.sql);
			
			var query2 = conn.query('insert into test_product set ?', product, function(err,result) {
				if (err) {
					console.error(err);
					conn.rollback(function(){
						console.error('rollback error');
						throw err;
					});
				}

				console.log('qry2 : ' + query2.sql);
				
				conn.commit(function(err){
					if (err) {
						console.error(err);
						conn.rollback(function(){
							console.error('rollback error');
							throw err;
						});
					}
					
					//query1, query2 수행완료 및 commit 성공.
					res.status(200).send('success');	//res.status(status).send(body)
					
					console.log('=== Transaction End ===');
					
				}); //conn.commit
				
			});	//query2
			
		}); //query1
		
	}); //beginTransaction

	
});

module.exports = router;
