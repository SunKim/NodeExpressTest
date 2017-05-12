
var express = require('express');
var router = express.Router();


/*
 * 요청시 json으로 name, address 전송 필요
 * 
 * 
 * ex) 
 * {
 *	"name":"Sun Kim",
 *	"address":"서울시 강남구 도산대로 301 4층"
 * }
 * 
 */

//request가 json이면 GET이 아닌 PUT method로 와야함.
router.get('/', function(req, res, next) {
	
	req.accepts('application/json');
	
	var result = 'success';
	var error = '';

	//request로 넘어온 json 값 추출
	json = req.body;
	console.log('name is :'+json.name);
	console.log('address is :'+json.address);

	if ( typeof json.name == 'undefined' || typeof json.address == 'undefined' ) {
		result = 'fail';
		error = 'request의 JSON에 name, address 필드가 없습니다. Postman 등의 툴을 통해 PUT method로 name/address 정보를 포함한 json body 요청이 필요합니다.';
	}
	
	//response 설정
	var jsonResult = { 
			'result': result, 
			'error': error, 
			'name': json.name, 
			'address': json.address 
	};
	
	res.json(jsonResult);
});


//request가 json이면 GET이 아닌 PUT method로 와야함.
router.put('/', function(req, res, next) {
	
	req.accepts('application/json');
	
	var result = 'error';
	var error = '';

	//request로 넘어온 json 값 추출
	json = req.body;
	console.log('name is :'+json.name);
	console.log('address is :'+json.address);

	if ( typeof json.name == 'undefined' || typeof json.address == 'undefined' ) {
		result = 'fail';
		error = 'request의 JSON에 name, address 필드가 없습니다.';
	}

	//response 설정
	var jsonResult = { 
			'result': result, 
			'error': error, 
			'name': json.name, 
			'address': json.address 
	};
	
	res.json(jsonResult);
});

module.exports = router;
