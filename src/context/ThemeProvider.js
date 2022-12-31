import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { saveTheme, validThemeStorage } from '../services/themeAPI';
import ThemeContext from './ThemeContext';

const THEME_LIGTH = 'theme-ligth';
const THEME_DARK = 'theme-dark';

class ThemeProvider extends Component {
  constructor() {
    super();
    this.state = {
      theme: '',
      checked: false,
    };
  }

  componentDidMount() {
    const currentThemeStorage = validThemeStorage();
    this.setState({ theme: currentThemeStorage }, () => {
      const validCurrentChecked = currentThemeStorage === THEME_DARK;
      this.setState({ checked: validCurrentChecked });
    });
  }

  handleTheme = () => {
    const { theme } = this.state;
    const currentTheme = this.validCurrenTheme(theme);
    saveTheme(currentTheme);
    this.setState({ theme: currentTheme }, () => {
      const { checked } = this.state;
      this.setState({ checked: !checked });
    });
  }

  validCurrenTheme = (validate) => {
    const currentTheme = validate === THEME_LIGTH ? THEME_DARK : THEME_LIGTH;
    return currentTheme;
  }

  render() {
    const { children } = this.props;
    const { theme, checked } = this.state;
    const { handleTheme } = this;
    return (
      <ThemeContext.Provider value={ { theme, checked, handleTheme } }>
        <div>
          {children}
        </div>
      </ThemeContext.Provider>
    );
  }
}

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ThemeProvider;
