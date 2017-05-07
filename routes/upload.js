var express = require('express');
var router = express.Router();
var multiparty = require('multiparty');
var fs = require('fs');

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
         
         //파일인지 아닌지 구분하여 처리하는 부분.
         if ( part.filename ) {
               filename = part.filename;
               size = part.byteCount;
         }else{
               part.resume();
         }

         //파일 업로드 완료 후 옮기는게 아니라 upload 되고있는 file stream을 WriteStream을 통해 pipe로 연결해 바로 씀.  
         console.log("Write Streaming file :"+filename);
         //window 기준, bin의 www가 root dir이므로 ../uploaded가 project/uploaded가 됨. Mac에서 확인 필요.
         var writeStream = fs.createWriteStream('../uploaded/'+filename);
         writeStream.filename = filename;
         part.pipe(writeStream);

         //파일은 한번에 전체가 다 읽어지는게 아니라 chunk 단위로 잘라져서 읽어들임. 한번 chunk를 읽을때마다 수행
         part.on('data', function(chunk){
               //console.log(filename+' read '+chunk.length + 'bytes');
         });

         //해당 part를 다 읽었을때. 파일을 다 써진것으로 취급하고 WriteStrem을 닫음. 
         part.on('end', function(){
               console.log(filename+' Part read complete');
               writeStream.end();
         });
    });

    // multipart form의 upload 완료
    form.on('close', function(){
         res.status(200).send('Upload complete');
    });

    // progress 추적
    form.on('progress',function(byteRead, byteExpected){
         //console.log(' Reading total  '+byteRead+'/'+byteExpected);
    });

    form.parse(req);
});

module.exports = router;