import React from 'react';
import Routes from './routes';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './assets/styles/theme';
import './assets/styles/global.css';
import CssBaseline from '@material-ui/core/CssBaseline';
import SearchContextProvider from './contexts/SearchContextProvider';
import { SnackbarProvider } from 'notistack';

function App() {
    return (
        <ThemeProvider theme={theme}>
            <SearchContextProvider
                intervaloRemuneracaoDefault={[300, 2500]}
            >
                <SnackbarProvider maxSnack={3}>
                    <CssBaseline/>
                    <Routes />
                </SnackbarProvider>
            </SearchContextProvider>
        </ThemeProvider>
    );
}

export default App;
