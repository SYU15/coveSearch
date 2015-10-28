var React = require('react');
var $ = require('jquery');
var search = require('search');

var SearchBar = React.createClass({
  getDefaultProps: function() {
    return {
      content: [
  { title: 'Andorra' },
  { title: 'United Arab Emirates' }] 
    };
  },
  componentDidMount: function() {
    $('.ui.search')
      .search({
        source: this.props.content
      });
  },
  componentDidUpdate: function() {
      $('.ui.search')
        .search({
          source: this.props.content
        });
  },
  render: function() {
    return (
      <div className="ui search">
        <input className="prompt" id="searchInput" type="text" placeholder="Search..." />
        <div className="results"></div>
      </div>
      );
  }
});

module.exports = SearchBar;
