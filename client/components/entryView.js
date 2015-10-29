import React from 'react';
import $ from 'jquery';

var TVEntry = React.createClass({
  handleProgram: function() {
    var url = '/program?coveId='+this.props.data.cove_id;
    console.log(url);

    var that = this;
    $.ajax({
      url: url,
      type: 'GET',
      success: function(result){
        console.log(result);
      },
      error: function(result){
        console.log(result);
      }
    });
  },
  render: function() {
    return (
      <div className="ui segment" onClick={this.handleProgram}>
        <img src={this.props.data.associated_images.length > 2 ? this.props.data.associated_images[2].url : ""} />
        <h3 className="ui header react-link">{this.props.data.title}</h3>
      </div>
      );
  }
});

module.exports = TVEntry;
