var express = require('express');
var app = express();
var bodyParser = require('body-parser')
var indexRouter = require('./src/routes/index');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
// set the view engine to ejs
app.set('view engine', 'ejs');
app.set('views', './views');
app.use('/public', express.static("public"));
app.use('/', indexRouter)
app.listen(3600);
console.log('Server is listening on: http://localhost:3600');