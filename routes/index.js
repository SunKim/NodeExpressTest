var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	var data = {
		title: 'Node.js & Express Test by Sun Kim(sjmarine97@gmail.com)', 
		contentList: [
			{uri : '/', cmt : '메인페이지'}, 
			{uri : '/upload', cmt : '파일업로드 관련. get요청시 업로드폼 render. post요청시 파일업로드.'},
			{uri : '/session', cmt : '세션 관련. /session/read, /session/write.'},
			{uri : '/header', cmt : '헤더 관련. /header 요청헤더정보읽기, /header/response 응답헤더정보쓰기.'},
			{uri : '/cookie', cmt : '쿠키 관련.'},
			{uri : '/jsonrequest', cmt : 'request의 body가 application/json일 경우 처리. Postman 등의 tool을 통해 PUT method로 name/address를 넘겨줘야함.'},
			{uri : '/db', cmt : 'DB 관련(node-mysql 모듈 사용). /db/insert, db/select, db/transaction 구현. select는 select, selectsome, selectall 가능.'},
			{uri : '/dbpool', cmt : 'DB pool을 이용. /dbpool/insert, /dbpool/select, /dbpool/selectsome, /dbpool/selectall'},
			{uri : '/simplechat', cmt : 'socket.io를 통해 간단한 채팅기능 구현. 창 여러개 띄워놓고 실행.'}
		]
	};
	
	res.render('index', data);
});

module.exports = router;
