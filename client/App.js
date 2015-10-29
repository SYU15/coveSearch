import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Link } from 'react-router';
import Search from './components/search.js';
import ProgramVideos from './components/programVideos.js';

render((
  <Router>
    <Route name="search" path="/" component={Search} />
    <Route name="video" path="/programs/:videoId" component={ProgramVideos} />
  </Router>
), document.getElementById('app'))
