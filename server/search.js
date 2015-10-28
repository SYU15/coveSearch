var AWS = require('aws-sdk');
var elasticUrl = process.env.ES_URL;
var coveUrl = process.env.COVE_URL;
var rp = require('request-promise');

// var request = require('request');
// var Promise = require('bluebird');

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
  processData: function(object) {

  },
  submitSearch: function(req, res) {
    var keywords = req.query.keywords;
    console.log(keywords);
    var newElasticUrl = elasticUrl + keywords;
    console.log(newElasticUrl);
    rp(newElasticUrl)
    .then(function(body){
      body = JSON.parse(body);
      var programs = body.hits.hits.map(function(item){
        return item._source;
      });
      return programs;
    }).then(function(programs){
      res.send(programs);
    });
  }
};
