var zlib = require('zlib');
const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
var result = {"LOCATION_FORMAT ":["ID","LONGITUDE","LATITUDE","TIMESTAMP","VELOCITY","DIRECTION","COUNTRY CODE","EURO VALUE","MTM"]
,"LOCATION":[]}


express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', function(req, res) {
	if ((!req.query.maxAge) || (req.query.maxAge> 300)) 
		{occurence=300;} 
	else 
		{occurence=req.query.maxAge;}

	var acceptEncoding = req.headers['accept-encoding'];
	if (!acceptEncoding) {
		acceptEncoding = '';
	}
	
	  result.LOCATION=[];
	  for (var i = 0; i < occurence * 1700000 / (300 * (1+Math.random())); i++) {
		dt=new Date();
		dt.setMonth(8);
		dt.setMinutes(dt.getMinutes()+119);
		if (dt.getMonth()<10) {
			dateTxt=dt.getFullYear()+'-0'+dt.getMonth()
		} else {
			dateTxt=dt.getFullYear()+'-'+dt.getMonth()
		}
		if (dt.getDate()<10) {
			dateTxt+='-0'+dt.getDate()
		} else {
			dateTxt+='-'+dt.getDate()
		}
		if (dt.getHours()<10) {
			dateTxt+='T0'+dt.getHours()
		} else {
			dateTxt+='T'+dt.getHours()
		}
		if (dt.getMinutes()<10) {
			dateTxt+=':0'+dt.getMinutes()
		} else {
			dateTxt+=':'+dt.getMinutes()
		}
		if (dt.getSeconds()<10) {
			dateTxt+=':0'+dt.getSeconds()
		} else {
			dateTxt+=':'+dt.getSeconds()
		}
		dateTxt+='Z'						
		
		result.LOCATION.push(["3156490059059000000",6.145409,51.381982,dateTxt,44,27546,"FR",4,3800]);
		
	  }
	if (acceptEncoding = 'gzip') {
		res.writeHead(200, {'Content-Encoding': 'gzip'});
		zlib.gzip(result, function (_, resultzip) {  // The callback will give you the 
			res.send('reultat en zip');
			//res.send(resultzip);                     // result, so just send it.
		});
	} else {
		res.send(result);	
	}
		
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
