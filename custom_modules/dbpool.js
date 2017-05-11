
var mysql = require('mysql');

var db_config = require('../properties/db_config.json');
var mysqlPool = mysql.createPool(db_config);


var dbpool = (function () {

	function _query(query, params, callback) {
		//console.log('dbpool.js - _query.');
		console.log('query : ' + query);
		console.log('params : ' + params);
		
		mysqlPool.getConnection(function (err, connection) {
			if (err) {
				connection.release();
				callback(null, err);
				throw err;
				next(err);
			}

			connection.query(query, params, function (err, rows) {
				connection.release();
				
				//console.log('err : ' + err);
				//console.log('rows : ' + JSON.stringify(rows));
				
				if (err) {
					callback(err);
					throw err;
				}
				else {
					callback(err, rows);
				}
			});

			connection.on('error', function (err) {
				connection.release();
				callback(null, err);
				throw err;
				next(err);
			});
		});
	};

	return {
		query: _query
	};
})();

module.exports = dbpool;