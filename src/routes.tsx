import React from 'react';
import { BrowserRouter, Redirect, Route } from "react-router-dom";
import Plantoes from './pages/plantoes';

function Routes () {
    return (
        <BrowserRouter >
            <Route path="/" exact><Redirect to="/plantoes" /></Route>
            <Route path="/plantoes" component={Plantoes} />
        </BrowserRouter>
    );
}

export default Routes;