import React from 'react';
import { Router, Route } from 'react-router-dom';
import PlantoesContextsProvider from './pages/plantoes/';
import Cadastro from './pages/cadastro';
import Landing from './pages/landing';
import Login from './pages/login';
import history from './services/history';

function Routes () {
    return (
        <Router history={history} >
            <Route path="/" exact component={Landing}></Route>
            <Route path="/login" component={Login}></Route>
            <Route path="/cadastro" component={Cadastro} />
            <Route path="/plantoes" component={PlantoesContextsProvider} />
        </Router>
    );
}

export default Routes;
