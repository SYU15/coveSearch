import React from 'react';
import $ from 'jquery';

const Videos = React.createClass({
  parseHtml: function(string) {
    return $.parseHTML(string);
  },
  componentDidMount: function(){
    var id = '#' + this.props.data.guid;
    console.log(this.props.data);
    var iframe = this.parseHtml(this.props.data.partner_player); 
    $(id).append(iframe);
  },
  render: function() {
    return (
      <div id={this.props.data.guid}></div>
      );
  }
});

module.exports = Videos;
