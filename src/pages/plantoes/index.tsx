import { SnackbarProvider } from 'notistack';
import React from 'react';
import SearchContextProvider from '../../contexts/SearchContextProvider';
import Plantoes from './plantoes';

function PlantoesContextsProvider () {
    return (
        <SearchContextProvider
            intervaloRemuneracaoDefault={[300, 2500]}
        >
            <SnackbarProvider maxSnack={3}>
                <Plantoes/>
            </SnackbarProvider>
        </SearchContextProvider>
    );
}

export default PlantoesContextsProvider;
