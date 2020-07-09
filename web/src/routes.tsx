import React from 'react';
import {Route, BrowserRouter} from 'react-router-dom';

import Home from './pages/Home';
import CreateCategories from './pages/CreateCategories';
import ListCategories from './pages/ListCategories';

const Routes = () => {
    return (
        <BrowserRouter>
            <Route component={Home} path="/" exact />
            <Route component={CreateCategories} path="/create-categories"  />
            <Route component={ListCategories} path="/list-categories"  />
        </BrowserRouter>
    );
}

export default Routes;

