import React from 'react';
import $ from 'jquery';
import {Router, Route, Link} from 'react-router';

const TVEntry = React.createClass({
  render: function() {
    var images = this.props.data.associated_images || [];
    var coveId = this.props.data.cove_id || this.props.data.title;
    return (
      <div className="ui segment">
        <img src={images.length > 2 ? images[2].url : ""} />
        <Link to={`/programs/${coveId}`}><h3 className="ui header react-link">{this.props.data.title}</h3></Link>
      </div>
      );
  }
});

module.exports = TVEntry;
