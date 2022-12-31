import React, { Component } from 'react';
import ThemeContext from './ThemeContext';

class ThemeProvider extends Component {
  constructor() {
    super();
    this.state = {
      theme: 'theme-ligth',
    };
  }

  componentDidMount() {
    const { theme } = this.state;
    const currentTheme = theme === 'theme-ligth' ? 'theme-dark' : 'theme-ligth';
    this.setState({ theme: currentTheme });
  }

  handleTheme = () => {
    const { theme } = this.state;
    const currentTheme = theme === 'theme-ligth' ? 'theme-dark' : 'theme-ligth';
    this.setState({ theme: currentTheme });
    console.log(theme);
    // const { theme } = this.state;
    // this.setState({ theme: !theme }, () => {
    //   console.log(theme);
    //   const { currentTheme } = this.state;
    //   const validCurrentTheme = theme ? 'theme-dark' : 'theme-light';
    //   this.setState({ currentTheme: validCurrentTheme });
    //   console.log(currentTheme);
    // });
  }

  render() {
    const { children } = this.props;
    const { theme } = this.state;
    const { handleTheme } = this;
    return (
      <ThemeContext.Provider value={ { theme, handleTheme } }>
        <div>
          {children}
        </div>
      </ThemeContext.Provider>
    );
  }
}

export default ThemeProvider;
