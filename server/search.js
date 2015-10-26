module.exports = {
  submitSearch: function(req, res) {
    console.log(req.query.keywords);
    res.send('Working');
  }
};
