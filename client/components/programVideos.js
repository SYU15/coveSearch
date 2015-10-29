import React from 'react';
import $ from 'jquery';
import Videos from './videos.js';

const ProgramVideos = React.createClass({
  getInitialState: function() {
    return {
      videos: [],
      videoType: 'Episode'
    };
  },
  getVideos: function() {
    var url = '/program?coveId='+this.props.params.videoId + '&videoType='+this.state.videoType;

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
  componentDidMount: function() {
    this.getVideos();
  },
  // handleVideoType: function(type) {
  //   this.setState({videoType: type});
  //   this.getVideos();
  // },
  render: function() {
    var rows = this.state.videos.map((video, i) => {
        return <Videos data={video} key={i} />
      });
    // <div className="ui two item menu">
    //   <a className="active item" onClick={this.handleVideoType.bind(this, 'Episode')}>Episodes</a>
    //   <a className="item" onClick={this.handleVideoType.bind(this, 'Clip')}>Clips</a>
    // </div>
    return (
      <div className="eight wide column react-search">
        {rows}
      </div>
      );
  }
});

module.exports = ProgramVideos;
