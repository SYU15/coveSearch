var express = require('express');
var path = require('path');
var searchHandler = require('./server/search.js');

var app = express();
app.use(express.static(__dirname + '/public'));
app.get('/search', searchHandler.submitSearch);

var PORT = process.env.PORT || 3000;
var server = app.listen(PORT);

console.log("Server listening on port ", PORT);
