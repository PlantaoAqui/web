import { createMuiTheme, responsiveFontSizes } from '@material-ui/core';

let theme = createMuiTheme({
    typography: {
        fontFamily: 'SFProText'
    },
    palette: {
        text: {
            primary: '#3E3E3E',
            secondary: '#707070'
        }
    }
});

theme = responsiveFontSizes(theme);

export default theme;
