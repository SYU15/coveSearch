var AWS = require('aws-sdk');

var es = new AWS.ES();

AWS.config.update({accessKeyId: process.env.AWS_ACCESS_KEY, secretAccessKey: process.env.AWS_SECRET_KEY});

var params = {};

// es.getSignedUrl('test', params, function(err, data) {
//   if(err) {
//     console.log(err);
//   } else {
//     console.log(data);
//   }
// });

module.exports = {
  submitSearch: function(req, res) {
    console.log(req.query.keywords);
    res.send('Working');
  }
};
