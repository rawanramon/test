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
  .get('/', function(req, res) {if ((!req.query.maxAge) || (req.query.maxAge> 360)) {occurence=300/30*170000;} else {occurence=req.query.maxAge/30*170000;}
  for (var i = 0; i < occurence; i++) {
	result.LOCATION.push(pos);
	}
  res.send(result)})
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
