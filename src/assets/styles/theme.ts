import { createMuiTheme, responsiveFontSizes } from "@material-ui/core";

let theme = createMuiTheme({
    typography: {
        fontFamily: 'SFProText'
    }
})

theme = responsiveFontSizes(theme);

export default theme;
