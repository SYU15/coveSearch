import React from 'react';
import $ from 'jquery';
import {Router, Route, Link} from 'react-router';

const TVEntry = React.createClass({
  render: function() {
    return (
      <div className="ui segment">
        <img src={this.props.data.associated_images.length > 2 ? this.props.data.associated_images[2].url : ""} />
        <Link to={`/programs/${this.props.data.cove_id}`}><h3 className="ui header react-link">{this.props.data.title}</h3></Link>
      </div>
      );
  }
});

module.exports = TVEntry;
