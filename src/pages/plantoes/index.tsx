import React from 'react';
import SearchContextProvider from '../../contexts/SearchContextProvider';
import Plantoes from './plantoes';

function PlantoesContextsProvider () {
    return (
        <SearchContextProvider
            intervaloRemuneracaoDefault={[300, 2500]}
        >
            <Plantoes/>
        </SearchContextProvider>
    );
}

export default PlantoesContextsProvider;
