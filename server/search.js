var elasticUrl = process.env.ES_URL;
var rp = require('request-promise');

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
//   "sort" : [
//        { "type" : {"missing" : "_first"} }
//      ],
//     "query" : {
//         "multi_match" : {
//             "fields" : ["title", "short_description", "long_description"],
//             "query" : keywords,
//             "slop":  10,
//             "type" : "phrase_prefix"
//         }
//     }
// };

// var data = {
//     "query" : {
//         "multi_match" : {
//             "fields" : ["title", "short_description", "long_description"],
//             "query" : keywords,
//             "type" : "best_fields",
//             "max_expansions": 50,
//             "fuzziness": 1
//         }
//     }
// };
// var data = {
//   "query": {
//     "bool": {
//       "should": [
//         { "match": { "title":  keywords, "type" : "phrase_prefix", "fuzziness": 1}},
//         { "match": { "short_description": keywords, "type" : "phrase_prefix", "fuzziness": 1 }},
//         { "match": { "long_description": keywords, "type" : "phrase_prefix", "fuzziness": 1 }}
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
