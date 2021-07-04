import React from 'react';
import Routes from './routes';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './assets/styles/theme';
import './assets/styles/global.css';
import CssBaseline from '@material-ui/core/CssBaseline';

function App () {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <Routes />
        </ThemeProvider>
    );
}

export default App;
