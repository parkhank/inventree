import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Inventory from './pages/Inventory';
import Items from './pages/Items';
import CasesUsed from './pages/CasesUsed';
import Count from './pages/Count';
import Invoice from './pages/Invoice';

const App = () => {
  return (
    <BrowserRouter>
      <Navigation />
      <Switch>
        <Route
          path="/"
          exact
          component={Inventory} />
        <Route
          path="/branch/:locationID"
          component={Inventory} />
        <Route
          path="/items"
          component={Items} />
        <Route
          path="/cases"
          component={CasesUsed} />
        <Route
          path="/count/:locationID"
          component={Count} />
        <Route
          path="/invoice"
          component={Invoice} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
