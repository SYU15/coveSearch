import React from 'react';
import $ from 'jquery';
import Videos from './videos.js';

const ProgramVideos = React.createClass({
  getInitialState: function() {
    return {
      videos: []
    };
  },
  componentDidMount: function() {
    var url = '/program?coveId='+this.props.params.videoId;
    console.log(url);

    var that = this;
    $.ajax({
      url: url,
      type: 'GET',
      success: function(result){
        result = JSON.parse(result);
        that.setState({videos: result.results});
      },
      error: function(result){
        console.log(result);
      }
    });
  },
  render: function() {
    var rows = this.state.videos.map((video, i) => {
        return <Videos data={video} key={i} />
      });
    return <div className="eight wide column">{rows}</div>;
  }
});

module.exports = ProgramVideos;
