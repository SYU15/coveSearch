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
  submitSearch: function(req, res) {
    var keywords = req.query.keywords;

  var data = {
   "query": {
    "match_phrase_prefix" : {
        "title" : {
            "query": keywords,
            "slop":  10,
            "max_expansions": 50
        }
    }
    }
  };
    // var data = {
    //   "query": {
    //     "bool": {
    //       "should": [
    //         { "match": { "title":  keywords }},
    //         { "match": { "short_description": keywords }},
    //         { "match": { "long_description": keywords }}
    //       ]
    //     }
    //   }
    // };

    var options = {
      method: 'POST',
      uri: elasticUrl,
      body: JSON.stringify(data)
    };

    rp(options)
    .then(function(body){
      console.log(body);
      body = JSON.parse(body);
      var programs = body.hits.hits.map(function(item){
        return item._source;
      });
      return programs;
    }).then(function(programs){
      res.send(programs);
    }).catch(function (err) {
      console.log(err);
    });
  }
};
