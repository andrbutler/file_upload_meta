var express = require('express');
var app = express();
var multer  = require('multer');
var upload = multer({ dest: 'uploads/' });
const axios = require('axios');

app.set('port', (process.env.PORT || 8080));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.static('public'));

app.get('/', function(req, resp){
	resp.writeHead(200, {'Content-type': 'text/html'});
	resp.on('error', function(error){
		console.log(error);
	});
	resp.sendfile('index.html');
});

app.get('/weather', function(req, resp){
	let lat = req.query.lat || '38.5367';
	let lon = req.query.lon || '82.6829';
	let key = process.env.KEY;
	let url = 'https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&mode=json&units=imperial&APPID=' + key;
    console.log('url: ', url);
	axios.get(url)
		.then(res => {
			console.log(res.data);
			resp.writeHead(200, {'Content-type': 'application/json'});
			resp.end(JSON.stringify(res.data));
		}).catch(err => {
			console.log(err);
		});
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