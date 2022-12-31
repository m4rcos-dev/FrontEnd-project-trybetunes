import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  saveSecondaryTheme,
  saveTheme,
  validSecondaryThemeStorage,
  validThemeStorage,
} from '../services/themeAPI';
import ThemeContext from './ThemeContext';

const THEME_LIGTH = 'theme-ligth';
const THEME_DARK = 'theme-dark';
const SECONDARY_THEME_LIGTH = 'secondary-theme-ligth';
const SECONDARY_THEME_DARK = 'secondary-theme-dark';

class ThemeProvider extends Component {
  constructor() {
    super();
    this.state = {
      theme: '',
      secondaryTheme: '',
      checked: false,
    };
  }

  componentDidMount() {
    const currentThemeStorage = validThemeStorage();
    const currentSecondaryThemeStorage = validSecondaryThemeStorage();
    this.setState({
      theme: currentThemeStorage,
      secondaryTheme: currentSecondaryThemeStorage,
    },
    () => {
      const validCurrentChecked = currentThemeStorage === THEME_DARK;
      this.setState({ checked: validCurrentChecked });
    });
  }

  handleTheme = () => {
    const { theme, secondaryTheme } = this.state;
    const currentTheme = this.validCurrenTheme(theme);
    const currentSecondaryTheme = this.validCurrenSecondaryTheme(secondaryTheme);
    saveTheme(currentTheme);
    saveSecondaryTheme(currentSecondaryTheme);
    this.setState({ theme: currentTheme, secondaryTheme: currentSecondaryTheme }, () => {
      const { checked } = this.state;
      this.setState({ checked: !checked });
    });
  }

  validCurrenTheme = (validate) => {
    const currentTheme = validate === THEME_LIGTH ? THEME_DARK : THEME_LIGTH;
    return currentTheme;
  }

  validCurrenSecondaryTheme = (validate) => {
    const currentSecondaryTheme = validate === SECONDARY_THEME_LIGTH
      ? SECONDARY_THEME_DARK : SECONDARY_THEME_LIGTH;
    return currentSecondaryTheme;
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
