import React from 'react';

import DateInput from './date-input.js';
import Main from './main.js';

class App extends React.Component {
  render() {
    return (
      <main>
        <DateInput />
        <Main />
      </main>
    );
  }
}

export default App;
