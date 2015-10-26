var React = require('react');
var ReactDOM = require('react-dom');
var url = process.env.URL || 'http://localhost:8000';

var Search = React.createClass({
  //will need to handle spaces
  handleSearch: function() {
    var search = document.getElementById('searchInput').value;
    console.log(search);
    document.getElementById('searchInput').value = "";

    var xhr = new XMLHttpRequest();
    var newUrl = url + '/search?keywords='+search;
    xhr.open("GET", newUrl);
    xhr.send();
  },
  render: function() {
    return (
      <div className="eight wide column react-search">
        <div className="ui icon input">
          <input id="searchInput" type="text" placeholder="Search..." />
          <button className="ui button" onClick={this.handleSearch}>Submit</button>
        </div>
      </div>
      );
  }
});

ReactDOM.render(<Search />, document.getElementById('app'));
