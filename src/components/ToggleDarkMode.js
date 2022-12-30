import React, { Component } from 'react';
import moon from '../assets/musicDark.svg';
import sun from '../assets/musicLight.svg';

class ToggleDarkMode extends Component {
  render() {
    return (
      <div className="toogle-container">
        <input type="checkbox" id="darkmode-toggle" />
        <label htmlFor="darkmode-toggle">
          <img className="moon" alt="icon moon" src={ moon } />
          <img className="sun" alt="icon sun" src={ sun } />
        </label>
      </div>
    );
  }
}

export default ToggleDarkMode;
