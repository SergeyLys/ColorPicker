import React, { Component } from 'react';
import ColorPicker from './ColorPicker';

const colors = [
  {name: 'red', value: '#FF0000'},
  {name: 'green', value: '#00FF00'},
  {name: 'blue', value: '#0000FF'},
  {name: 'magenta', value: '#FF00FF'},
  {name: 'yellow', value: '#FFFF00'},
  {name: 'light blue', value: '#00FFFF'},
];

class App extends Component {
  render() {
    return (
      <div>
        <ColorPicker
            value='#FF0000'
            colors={colors}
            onChange={(color) => console.log(color)}
        />
      </div>
    );
  }
}

export default App;
