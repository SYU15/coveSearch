import React from 'react';
import NewsEntry from './entryView';
import SearchBar from './searchBar';
import $ from 'jquery';
import DatePick from './datepicker';
  
const Search = React.createClass({
  getInitialState: function() {
    return {
      searchData: [],
      hasSearch: false
    };
  },
  handleSearch: function() {
    var search = document.getElementById('searchInput').value;
    this.props.actions.fetchEntries(search);
  },
  render: function() {
    const { searchEntries, actions } = this.props;

    if(searchEntries) {
      var rows = searchEntries.map((article, i) => {
          return <NewsEntry data={article} key={i} />
        });

      if(this.state.hasSearch && rows.length === 0) {
        var rows2 = <h3>Your search returned no results, but you can see a list of our <span className="react-link">most popular programs</span> or <span className="react-link">browse.</span></h3>
      }
    }

    return (
      <div  className="ui center aligned grid">
        <div className="sixteen wide column react-search">
          <div className="ui icon input">
            <SearchBar searchEntries = {searchEntries} actions = {actions}/>
            <button className="ui button" onClick={this.handleSearch}>Submit</button>
          </div>
          <DatePick />
        </div>
        <div className="eight wide column">
          {rows}
          {rows2}
        </div>
      </div>
      );
  }
});

module.exports = Search;
