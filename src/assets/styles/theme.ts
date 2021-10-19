import { createTheme } from '@material-ui/core';

const theme = createTheme({
    typography: {
        fontFamily: "'SFProText', sans-serif",
        h1: {
            lineHeight: '6.2rem',
            letterSpacing: '-2px'
        },
        h3: {
            fontSize: '3.6rem'
        },
        h4: {
            fontSize: '2.8rem',
            lineHeight: '3.2rem'
        },
        h5: {
            fontSize: '1.85rem'
        },
        h6: {
            fontSize: '1.85rem',
            lineHeight: '2rem'
        },
        subtitle1: {
            fontSize: '1.6rem',
            lineHeight: '1.8rem',
            letterSpacing: '0.15px'
        },
        subtitle2: {
            fontSize: '1rem',
            letterSpacing: '0.15px'
        },
        button: {
            fontSize: '1.4rem'
        },
        body1: {
            fontSize: '1.25rem',
            letterSpacing: '0.5px'
        },
        body2: {
            fontSize: '1.25rem',
            letterSpacing: '0.5px',
            lineHeight: '1.6rem'
        },
        caption: {
            fontSize: '0.95rem'
        }
    },
    palette: {
        divider: '#B7B8BA',
        text: {
            primary: '#000000',
            secondary: '#3E3E3E',
            hint: '#707070'
        },
        background: {
            default: '#F8F8F8',
            paper: '#E9EAEA'
        }
    },
    spacing: 4
});

// theme = responsiveFontSizes(theme);

export default theme;
