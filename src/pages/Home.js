import React, { Component } from 'react';
import Header from '../components/Header';
import HeaderHorizontal from '../components/HeaderHorizontal';
import HeaderPages from '../components/HeaderPages';
import ThemeContext from '../context/ThemeContext';

class Home extends Component {
  render() {
    const { secondaryTheme } = this.context;
    return (
      <div id="home-container" className={ secondaryTheme }>
        <Header />
        <HeaderPages />
        <HeaderHorizontal />
      </div>
    );
  }
}

Home.contextType = ThemeContext;

export default Home;
