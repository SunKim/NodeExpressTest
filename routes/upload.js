var express = require('express');
var router = express.Router();
var multiparty = require('multiparty');
var fs = require('fs');
var uuid = require('uuid');		//time stamp기반으로 random한 file명을 얻기 위한 library

//파일명을 원본으로 사용할지, random하게 생성할지 여부
const bFileRename = false;

//get 요청시 upload form 보여줌
router.get('/', function(req, res, next) {
	res.render('upload', { title: 'File Upload Test' });
});

//post 요청시 upload 처리
router.post('/', function(req, res, next) {
	var form = new multiparty.Form();
	
	// file이 아닌 일반 form filed가 들어왔을경우
	form.on('field',function(name,value){
		console.log('normal field / name = '+name+' , value = '+value);
	});

	// file upload handling
	form.on('part',function(part){
		var filename;
		var size;
		var extension;
		var filenameRandom;

		//파일인지 아닌지 구분하여 처리하는 부분.
		if ( part.filename ) {
			filename = part.filename;	//원본 파일명
			size = part.byteCount;		//파일 사이즈

			extension = filename.split('.').pop();		//원본 파일 확장자
			filenameRandom = uuid.v1() + '.' + extension;	//random파일명 + 원본확장자
		}else{
			part.resume();
		}

		console.log("Write Streaming file :"+filename);

		//파일 업로드 완료 후 옮기는게 아니라 upload 되고있는 file stream을 WriteStream을 통해 pipe로 연결해 바로 씀.
		var writeStream;
		if ( bFileRename ) {
			writeStream = fs.createWriteStream('../uploaded/'+filenameRandom);
			writeStream.filename = filenameRandom;			
		} else {
			writeStream = fs.createWriteStream('../uploaded/'+filename);
			writeStream.filename = filename;
		}

		part.pipe(writeStream);

		//파일은 한번에 전체가 다 읽어지는게 아니라 chunk 단위로 잘라져서 읽어들임. 한번 chunk를 읽을때마다 수행
		part.on('data', function(chunk){
			//console.log(filename+' read '+chunk.length + 'bytes');
		});

		//해당 part를 다 읽었을때. 파일을 다 써진것으로 취급하고 WriteStrem을 닫음. 
		part.on('end', function(){
			console.log(filename+' Part read complete. 원본파일명 : ' + filename + ", 랜덤파일명 : " + filenameRandom);
			writeStream.end();
		});
	});

	// multipart form의 upload 완료
	form.on('close', function(){
		res.status(200).send('Upload complete.');
	});

	// progress 추적
	form.on('progress',function(byteRead, byteExpected){
		//console.log(' Reading total  '+byteRead+'/'+byteExpected);
	});

	form.parse(req);
});

module.exports = router;