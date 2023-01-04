import React, { Component } from 'react';
import ToggleDarkMode from './ToggleDarkMode';

class HeaderPages extends Component {
  render() {
    return (
      <div>
        <div className="header-pages-container" />
        <div className="toggle-dark-mode-container">
          <ToggleDarkMode />
        </div>
      </div>
    );
  }
}

export default HeaderPages;
