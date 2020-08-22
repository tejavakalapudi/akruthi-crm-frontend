import { createMuiTheme } from '@material-ui/core/styles'
import light from './light';
import dark from './dark';

const themes = { light, dark };

const getThemes = (type) =>  createMuiTheme(themes[type]); 

export default getThemes;