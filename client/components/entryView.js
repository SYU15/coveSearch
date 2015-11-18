import React from 'react';
import $ from 'jquery';
import {Router, Route, Link} from 'react-router';

const TVEntry = React.createClass({
  parseHtml: function(string) {
    return $.parseHTML(string);
  },
  componentDidMount: function(){
  },
  componentWillUpdate: function() {
  },
  componentDidUpdate: function() {
  },
  render: function() {
    return (
      <div className="ui segment">
        <a href={this.props.data.link}><h3 className="ui header react-link">{this.props.data.title}</h3></a>
        <p>{this.props.data.content}</p>
      </div>
      );
    }
});

module.exports = TVEntry;
