import React from 'react';
import $ from 'jquery';

const Videos = React.createClass({
  parseHtml: function(string) {
    return $.parseHTML(string);
  },
  componentDidMount: function(){
    var id = '#' + this.props.data.guid;
    var iframe = this.parseHtml(this.props.data.partner_player); 
    $(id).append(iframe);
  },
  render: function() {
    return (
        <div className="ui segment">
          <div id={this.props.data.guid}></div>
          <h4>{this.props.data.short_description}</h4>
        </div>
      );
  }
});

module.exports = Videos;
