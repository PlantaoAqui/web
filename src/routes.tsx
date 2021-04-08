import React from 'react';
import { Router, Redirect, Route } from "react-router-dom";
import Cadastro from './pages/cadastro';
import Login from './pages/login';
import Plantoes from './pages/plantoes';
import history from './services/history';

function Routes () {
    return (
        <Router history={history} >
            <Route path="/" exact component={Login}></Route>
            <Route path="/plantoes" component={Plantoes} />
            <Route path="/cadastro" component={Cadastro} />
        </Router>
    );
}

export default Routes;
