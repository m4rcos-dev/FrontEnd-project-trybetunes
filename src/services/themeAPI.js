const THEME_KEY = 'trybeTunesTheme';
const INITIAL_THEME = 'theme-ligth';

export const saveTheme = (currenttheme) => localStorage
  .setItem(THEME_KEY, JSON.stringify(currenttheme));

export const readTheme = () => JSON.parse(localStorage
  .getItem(THEME_KEY));

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
