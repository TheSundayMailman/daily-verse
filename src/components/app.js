import React from 'react';

import DateInput from './date-input.js';
import Main from './main.js';

class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <DateInput />
        <Main />
      </React.Fragment>
    );
  }
}

export default App;
