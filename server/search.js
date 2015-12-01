var elasticUrl = process.env.ES_URL;
var rp = require('request-promise');
var extend = require('extend');

module.exports = {
  submitSearch: function(req, res) {
    var keywords = req.query.keywords;
    var program = req.query.program;

    var data = {};

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
// '{"properties":{"programs" :{"type":"string","index":"not_analyzed"}}}'
    if(program) {
      data = {
        "from" : 0, "size" : 30,
        "query" : {
          "function_score": {
            "query" : {
              "bool": {
                    "must":     { "match": { "programs": program }},
                    "should": {
                    "multi_match" : {
                        "fields" : ["title^5", "author^2", "content", "tags^3", "excerpt^3"],
                        "query" : keywords,
                        "slop":  10,
                        "type" : "phrase_prefix"
                    }

                  }
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
    } else {
      data = {
      "from" : 0, "size" : 30,
      "query" : {
        "function_score": {
          "query" : {
            "multi_match" : {
                "fields" : ["title^5", "author^2", "content", "tags^3", "excerpt^3"],
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
  }

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
