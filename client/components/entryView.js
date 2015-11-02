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
  selectImage: function(imageArray) {
    for(var i = 0; i < imageArray.length; i++) {
      if(imageArray[i].type.usage_type==="iPhone-Medium") {
        return imageArray[i].url;
      } else if(imageArray[i].type.usage_type==="iPad-Small") {
        return imageArray[i].url;
      } else if (imageArray[i].type.usage_type==="program-mezzanine-16x9") {
        return imageArray[i].url;
      }
    }
  },
  render: function() {
    if(this.props.data.cove_id) {
      return (
        <div className="ui segment">
          <img src={this.props.data.associated_images.length > 0 ? this.selectImage(this.props.data.associated_images) : ""} />
          <a href={'http://159.203.243.222/tv/programs-id/?program_id=' + this.props.data.cove_id}><h3 className="ui header react-link">{this.props.data.title}</h3></a>
        </div>
        );
    } else {
      return (
        <div className="ui segment">
          <div id={this.props.data.id}></div>
          <h3>{this.props.data.title}</h3>
          <div>{this.props.data.short_description}</div>
        </div>
      );
    }
  }
});

module.exports = TVEntry;
