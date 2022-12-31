const THEME_KEY = 'trybeTunesTheme';
const SECONDARY_THEME_KEY = 'trybeTunesSecondaryTheme';
const INITIAL_THEME = 'theme-ligth';
const INITIAL_SECONDARY_THEME = 'secondary-theme-ligth';

export const saveTheme = (currenttheme) => localStorage
  .setItem(THEME_KEY, JSON.stringify(currenttheme));

export const saveSecondaryTheme = (currenttheme) => localStorage
  .setItem(SECONDARY_THEME_KEY, JSON.stringify(currenttheme));

export const readTheme = () => JSON.parse(localStorage
  .getItem(THEME_KEY));

export const readSecondaryTheme = () => JSON.parse(localStorage
  .getItem(SECONDARY_THEME_KEY));

export const validThemeStorage = () => {
  const currentStorage = readTheme();
  if (currentStorage === null) {
    saveTheme(INITIAL_THEME);
    const currentTheme = readTheme();
    return currentTheme;
  }
  const currentTheme = readTheme();
  return currentTheme;
};

export const validSecondaryThemeStorage = () => {
  const currentSecondaryStorage = readSecondaryTheme();
  if (currentSecondaryStorage === null) {
    saveSecondaryTheme(INITIAL_SECONDARY_THEME);
    const currentSecondaryTheme = readSecondaryTheme();
    return currentSecondaryTheme;
  }
  const currentSecondaryTheme = readSecondaryTheme();
  return currentSecondaryTheme;
};
