import React from 'react';
import ReactDOM from 'react-dom';
import TVEntry from './components/entryView.js';
import SearchBar from './components/searchBar.js';
import $ from 'jquery';
  
var Search = React.createClass({
  getInitialState: function() {
    return {
      searchData: [],
      hasSearch: false
    };
  },
  //will need to handle spaces
  handleSearch: function() {
    var search = document.getElementById('searchInput').value;
    document.getElementById('searchInput').value = "";

    var url = '/search?keywords='+search;
    var that = this;
    $.ajax({
      url: url,
      type: 'GET',
      success: function(result){
        that.setState({searchData: result});
        that.setState({hasSearch: true});
      },
      error: function(result){
        console.log(result);
      }
    });
  },
  render: function() {
    var rows = this.state.searchData.map((program, i) => {
        return <TVEntry data={program} key={i} />
      });
    if(this.state.hasSearch && rows.length === 0) {
      console.log('called');
      var rows2 = <h3>Your search returned no results, but you can see a list of our <span className="react-link">most popular programs</span> or <span className="react-link">browse.</span></h3>
    }
    return (
      <div className="eight wide column react-search">
        <div className="ui icon input">
          <SearchBar />
          <button className="ui button" onClick={this.handleSearch}>Submit</button>
        </div>
        {rows}
        {rows2}
      </div>
      );
  }
});

ReactDOM.render(<Search />, document.getElementById('app'));
