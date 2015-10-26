var React = require('react');
var ReactDOM = require('react-dom');

var Search = React.createClass({
  render: function() {
    return (
      <div className="eight wide column react-search">
        <div className="ui icon input">
          <input type="text" placeholder="Search..." />
          <button className="ui button">Submit</button>
        </div>
      </div>
      );
  }
});

ReactDOM.render(<Search />, document.getElementById('app'));
