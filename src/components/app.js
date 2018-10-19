import React from 'react';
import { Route } from 'react-router-dom';

import LandingPage from './landing-page.js';
import DashBoard from './dashboard.js';

class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        {/* below is how to render LandingPage if history props needs to be passed in */}
        {/* <Route exact path="/" render={ props => <LandingPage {...props} />} /> */}
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/explore" component={DashBoard} />
      </React.Fragment>
    );
  }
}

export default App;
