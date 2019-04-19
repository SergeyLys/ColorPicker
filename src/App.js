import React, { Component } from 'react';
import ColorPicker from './ColorPicker';

class App extends Component {
  render() {
    return (
      <div>
        <ColorPicker value='#FF0000' />
      </div>
    );
  }
}

export default App;
