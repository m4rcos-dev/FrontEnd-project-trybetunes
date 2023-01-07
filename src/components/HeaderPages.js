import React, { Component } from 'react';
import ToggleDarkMode from './ToggleDarkMode';

class HeaderPages extends Component {
  render() {
    return (
      <div>
        <div id="header-pages-container" />
        <div id="toggle-dark-mode-container">
          <ToggleDarkMode />
        </div>
      </div>
    );
  }
}

export default HeaderPages;
