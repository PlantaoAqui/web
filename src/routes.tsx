import React from 'react';
import { Router, Route } from 'react-router-dom';
import SearchContextProvider from './contexts/SearchContextProvider';
import Cadastro from './pages/cadastro';
import Landing from './pages/landing';
import Login from './pages/login';
import Plantoes from './pages/plantoes';
import history from './services/history';

function Routes () {
    return (
        <Router history={history} >
            <Route path="/" exact component={Landing}></Route>
            <Route path="/login" component={Login}></Route>
            <Route path="/cadastro" component={Cadastro} />
            <Route path="/plantoes">
                <SearchContextProvider
                    intervaloRemuneracaoDefault={[300, 2500]}
                >
                    <Plantoes/>
                </SearchContextProvider>
            </Route>
        </Router>
    );
}

export default Routes;
