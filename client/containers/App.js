import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Search from '../components/search';
import * as SearchActions from '../actions/searchAction';

//This app passes in redux data to child components
const App = React.createClass({
  render: function() {
    const { searchEntries, actions } = this.props;
    return (
      <div>
        <Search />
      </div>
    )
  }
});

//grabs playlist props from playlist reducer (will need to add on this as more reducers are added)
function mapStateToProps(state) {
  return {
    searchEntries: state.searchEntries
  };
}
//grabs all actions from playlistActions (will need to add action files as app grows)
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(SearchActions, dispatch)
  }
}
//connects app to actions and reducers
module.exports = connect(mapStateToProps, mapDispatchToProps)(App);
