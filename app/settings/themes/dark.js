import variables from '../../styles/base/_settings.scss';

const theme = {
    palette:{
        type:'dark',
        primary:{
            main: variables.darkModePrimary,
            light: 'rgb(81, 91, 95)',
            dark: 'rgb(26, 35, 39)',
            contrastText: '#ffffff',
        },
        secondary:{
            main: variables.darkModeSecondary
        },
        background: {
            default: variables.darkModeBG
        },
    }
};

export default theme;