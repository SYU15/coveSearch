import React from 'react';
import $ from 'jquery';
import {Router, Route, Link} from 'react-router';

const NewsEntry = React.createClass({

  componentDidMount: function(){
  },
  componentWillUpdate: function() {
  },
  componentDidUpdate: function() {
  },
  createTitleMarkup: function() {
    return {__html: this.props.data.title};
  },
  createContentMarkup: function() {
    return {__html: this.props.data.excerpt};
  },
  render: function() {
    return (
      <div className="ui segment">
        <a href={this.props.data.link}><h3 className="ui header react-link" dangerouslySetInnerHTML={this.createTitleMarkup()}></h3></a>
        <p dangerouslySetInnerHTML={this.createContentMarkup()}></p>
      </div>
      );
    }
});

module.exports = NewsEntry;
