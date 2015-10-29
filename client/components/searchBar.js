import React from 'react';
import $ from 'jquery';
import search from 'search';
import Rx from 'rx-lite';

var SearchBar = React.createClass({
  getInitialState: function() {
    return {
      content: []
    };
  },
  sendRequest: function(keywords) {
    var url = '/search?keywords='+keywords;
    return $.ajax({
      url: url
    }).promise();
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
        source: this.state.content
      });

    var $input = $('#searchInput');

    var keyups = Rx.Observable.fromEvent($input, 'keyup')
                 .pluck('target', 'value')
                 .filter(function(text) {
                  return text.length > 2;
                 });
    var distinct = keyups.debounce(250).distinctUntilChanged();

    var suggestions = distinct.flatMapLatest(this.sendRequest);

    suggestions.subscribe((data)=>{
      var suggestions = this.formatSearchSuggestions(data) || [];
      this.setState({content: suggestions});
    });
  },
  componentDidUpdate: function() {
      $('.ui.search')
        .search({
          source: this.state.content
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
