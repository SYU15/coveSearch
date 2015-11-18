import React from 'react';
import $ from 'jquery';
import search from 'search';
// import Rx from 'rx-lite';
import debounce from 'lodash.debounce';

const SearchBar = React.createClass({
  sendRequest: function() {
    var keywords = $('#searchInput').val();

    if(keywords.length > 2) {
      this.props.actions.fetchEntries(keywords);
    }
  },
  formatSearchSuggestions: function(array) {
    if(array.length > 0) {
      var titles = array.map(function(item){
        return {title: item.title};
      });
      return titles;
    }
  },
  componentDidMount: function() {
    $('.ui.search')
      .search({
        source: []
      });

    $('#searchInput').on('keyup', debounce(this.sendRequest, 250));
  },
  componentDidUpdate: function() {

    var formattedEntries = this.formatSearchSuggestions(this.props.searchEntries);
    console.log(formattedEntries);
    
      $('.ui.search')
        .search({
          source: formattedEntries
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
