var express = require('express');
var path = require('path');
var searchHandler = require('./server/search.js');

var app = express();
app.use(express.static(__dirname + '/public'));
app.get('/search', searchHandler.submitSearch);
app.get('/program', searchHandler.getVideos);

var PORT = process.env.PORT || 8080;
var server = app.listen(PORT);

console.log("Server listening on port ", PORT);
