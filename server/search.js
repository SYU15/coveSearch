var AWS = require('aws-sdk');
var url = process.env.ES_URL;
var request = require('request');

// var es = new AWS.ES();

// AWS.config.update({accessKeyId: process.env.AWS_ACCESS_KEY, secretAccessKey: process.env.AWS_SECRET_KEY});

// var params = {};

// es.getSignedUrl('test', params, function(err, data) {
//   if(err) {
//     console.log(err);
//   } else {
//     console.log(data);
//   }
// });

module.exports = {
  submitSearch: function(req, res) {
    var keywords = req.query.keywords;
    var esUrl = url + keywords;

    request(esUrl, function (error, response, body) {
    
    });
    res.send('Working');
  }
};
