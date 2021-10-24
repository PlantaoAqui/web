import React from 'react';
import { Router, Route, Redirect } from 'react-router-dom';
import PlantoesContextsProvider from './pages/plantoes/';
import Cadastro from './pages/cadastro';
import Landing from './pages/landing';
import Login from './pages/login';
import history from './services/history';
import Carteira from './pages/carteira';
import Perfil from './pages/perfil';

function Routes() {
    function renderRestricted(component: JSX.Element) {
        const token = sessionStorage.getItem('refreshToken');

        if (token) {
            return component;
        } else {
            return <Redirect to="/" />;
        }
    }

    return (
        <Router history={history} >
            <Route path="/" exact component={Landing}></Route>
            <Route path="/login" component={Login}></Route>
            <Route path="/cadastro" component={Cadastro} />
            <Route path="/plantoes" render={() => renderRestricted(<PlantoesContextsProvider/>)} />
            <Route path="/carteira" render={() => renderRestricted(<Carteira/>)} />
            <Route path="/perfil" render={() => renderRestricted(<Perfil/>)} />
        </Router>
    );
}

export default Routes;
