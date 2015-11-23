var express = require('express');
var path = require('path');
var cors = require('cors');
var searchHandler = require('./server/search.js');

var app = express();

var cors_options = { orgin: '*'};
app.use(cors(cors_options));

app.use(express.static(__dirname + '/public'));
app.get('/search', searchHandler.submitSearch);

var PORT = process.env.PORT || 8080;
var server = app.listen(PORT);

console.log("Server listening on port ", PORT);
