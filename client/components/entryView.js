var React = require('react');

var TVEntry = React.createClass({
  render: function() {
    return (
      <div className="ui segment">
        <img src={this.props.data.associated_images.length > 2 ? this.props.data.associated_images[2].url : ""} />
        <h3 className="ui header">{this.props.data.title}</h3>
      </div>
      );
  }
});

module.exports = TVEntry;
