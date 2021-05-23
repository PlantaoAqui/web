import React from 'react';
import Routes from './routes';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './assets/styles/theme';
import './assets/styles/global.css';

function App () {
    return (
        <ThemeProvider theme={theme}>
            <Routes />
        </ThemeProvider>
    );
}

export default App;
