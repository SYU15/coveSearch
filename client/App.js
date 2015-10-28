import React from 'react';
import ReactDOM from 'react-dom';
import TVEntry from './components/entryView.js';
import SearchBar from './components/searchBar.js';

var Search = React.createClass({
  getInitialState: function() {
    return {searchData: []};
  },
  //will need to handle spaces
  handleSearch: function() {
    var search = document.getElementById('searchInput').value;
    console.log(search);
    document.getElementById('searchInput').value = "";

    var xhr = new XMLHttpRequest();
    var url = '/search?keywords='+search;
    xhr.onreadystatechange = () => {
      if (xhr.readyState == 4) {
        this.setState({searchData: JSON.parse(xhr.responseText)});
      }
    };
    xhr.open("GET", url);
    xhr.send();
  },
  render: function() {
    var rows = this.state.searchData.map((program, i) => {
        return <TVEntry data={program} key={i} />
      });
    return (
      <div className="eight wide column react-search">
        <div className="ui icon input">
          <SearchBar />
          <button className="ui button" onClick={this.handleSearch}>Submit</button>
        </div>
        {rows}
      </div>
      );
  }
});

ReactDOM.render(<Search />, document.getElementById('app'));
