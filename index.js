const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
var result = {"LOCATION_FORMAT ":["ID","LONGITUDE","LATITUDE","TIMESTAMP","VELOCITY","DIRECTION","COUNTRY CODE","EURO VALUE","MTM"]
,"LOCATION":[]}
var pos =["3156490059059000000",6.145409,51.381982,"2017-08-09T05:33:15Z",44,27546,"FR",4,3800]

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', function(req, res) {if ((!req.query.maxAge) || (req.query.maxAge> 300)) {occurence=300;} else {occurence=req.query.maxAge;}
  result.LOCATION=[];
  for (var i = 0; i < occurence * 1700000 / (60 * (5+Math.random())); i++) {
	dt=new Date();
	dt.setHours(dt.getHours()-11);
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
	
	result.LOCATION.push(pos);
	result.LOCATION[i][4]=dateTxt;
	
  }
  res.send(result)})
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
