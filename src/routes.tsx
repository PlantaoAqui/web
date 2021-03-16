import React from 'react';
import { BrowserRouter, Redirect, Route } from "react-router-dom";
import Cadastro from './pages/cadastro';
import Plantoes from './pages/plantoes';

function Routes () {
    return (
        <BrowserRouter >
            <Route path="/" exact><Redirect to="/plantoes" /></Route>
            <Route path="/plantoes" component={Plantoes} />
            <Route path="/cadastro" component={Cadastro} />
        </BrowserRouter>
    );
}

export default Routes;
