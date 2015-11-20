var elasticUrl = process.env.ES_URL;
var rp = require('request-promise');

module.exports = {
  submitSearch: function(req, res) {
    var keywords = req.query.keywords;
    // var data = {
    //  "query": {
    //     "match_phrase_prefix" : {
    //         "title" : {
    //             "query": keywords,
    //             "slop":  10,
    //             "max_expansions": 50
    //         }
    //     }
    //   }
    // };

//sort by date, give more recent articles greater weight
// var data = {
//   "query" : {
//       "multi_match" : {
//           "fields" : ["title^5", "author^2", "content", "tags", "excerpt^3"],
//           "query" : keywords,
//           "slop":  10,
//           "type" : "phrase_prefix"
//       }
//    }
// };

// var data = {
//   "query" : {
//       "multi_match" : {
//           "fields" : ["title^5", "author^2", "content", "tags", "excerpt^3"],
//           "query" : keywords,
//           "slop":  10,
//           "type" : "phrase_prefix"
//       }
//    },
//    "sort": [
//              { "date": { "order": "desc" }},
//              { "_score": { "order": "desc" }}
//            ]
//   };


var data = {
  "query" : {
    "function_score": {
      "query" : {
        "multi_match" : {
            "fields" : ["title^5", "author^2", "content", "tags", "excerpt^3"],
            "query" : keywords,
            "slop":  10,
            "type" : "phrase_prefix"
        }
      },
      "gauss": {
        "date": {
              "scale": "10d",
              "decay" : 0.5 
        }
      },
      "score_mode": "multiply"
    }
  }
};


    var options = {
      method: 'POST',
      uri: elasticUrl,
      body: JSON.stringify(data)
    };

    rp(options)
    .then(function(body){
      body = JSON.parse(body);
      var articles = body.hits.hits.map(function(item){
        item._source.id = item._id;
        return item._source;
      });
      return articles;
    }).then(function(articles){
      res.send(articles);
    }).catch(function (err) {
      console.log(err);
    });
  }
};
