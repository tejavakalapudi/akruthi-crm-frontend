import { createMuiTheme } from '@material-ui/core/styles'
import defaultTheme from './defaultTheme';
import darkTheme from './darkTheme';

const themes = {
    light: defaultTheme,
    dark: darkTheme
};

const getThemes = (type) =>  createMuiTheme(themes[type]); 

export default getThemes;