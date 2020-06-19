import React from 'react';
import {Route, BrowserRouter} from 'react-router-dom';

import Home from './pages/Home';
import CreateCategories from './pages/CreateCategories';

const Routes = () => {
    return (
        <BrowserRouter>
            <Route component={Home} path="/" exact />
            <Route component={CreateCategories} path="/create-categories"  />
        </BrowserRouter>
    );
}

export default Routes;

