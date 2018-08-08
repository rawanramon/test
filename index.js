const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', function(req, res) {if (!req.query.maxAge) || (req.query.maxAge== 360) {res.send('toto');} else {res.send('tata');}})
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
