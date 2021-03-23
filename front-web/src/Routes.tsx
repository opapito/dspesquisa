import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Header from './components/Header';
import Filters from './components/Filters'

const Routes = () =>(
  <BrowserRouter>
    <Header />
    <Switch>
      <Route path="/" exact>
        <Home />
      </Route>
      <Route path="/records">
        <Filters />
      </Route>
      <Route path="/charts">
        <Filters />
      </Route>
    </Switch>
  </BrowserRouter>

);

export default Routes;