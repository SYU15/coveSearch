import React from 'react';
import $ from 'jquery';
import {Router, Route, Link} from 'react-router';

const TVEntry = React.createClass({
  parseHtml: function(string) {
    return $.parseHTML(string);
  },
  componentDidMount: function(){
    var id = '#' + this.props.data.id;
    var iframe = this.parseHtml(this.props.data.partner_player); 
    $(id).append(iframe);
  },
  componentWillUpdate: function() {
    var id = '#' + this.props.data.id;
    $(id).children().remove();
  },
  componentDidUpdate: function() {
    var id = '#' + this.props.data.id;
    var iframe = this.parseHtml(this.props.data.partner_player); 
    $(id).append(iframe);
  },
  render: function() {
    return (
      <div className="ui segment">
        <img src={this.props.data.associated_images.length > 0 ? this.selectImage(this.props.data.associated_images) : ""} />
        <a href={'http://159.203.243.222/tv/programs-id/?program_id=' + this.props.data.cove_id}><h3 className="ui header react-link">{this.props.data.title}</h3></a>
      </div>
      );
    }
});

module.exports = TVEntry;
