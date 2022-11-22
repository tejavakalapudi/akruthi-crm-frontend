import { createTheme } from '@mui/material/styles';
import light from './light';
import dark from './dark';

const themes = { light, dark };

const getThemes = (type) => {
  const themeByType = themes[type];
  const theme = {
    ...themeByType,
    typography: {
      fontFamily: "'Poppins', 'Robotto', serif",
    },
  };
  return createTheme(theme);
};

export default getThemes;
