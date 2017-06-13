var express = require('express');
var app = express();
var multer  = require('multer');
var upload = multer({ dest: 'uploads/' });

app.set('port', (process.env.PORT || 8080));

app.use(express.static('public'));

app.get('/', function(req, resp){
	resp.writeHead(200, {'Content-type': 'text/html'});
	resp.on('error', function(error){
		console.log(error);
	});
	resp.sendfile('index.html');
});

app.post('/upload', upload.single('file'), function(req, resp){
	resp.on('error', function(error){
		console.log(error);
	});
	console.log(req.file);
	resp.writeHead(200, {'Content-type': 'application/json'});
	resp.end(JSON.stringify({upload: req.file.originalname, name: req.file.filename, size: req.file.size +' bytes'}));
});

app.listen(app.get('port'), function(){
	console.log('app running on port: ' + app.get('port'))
});