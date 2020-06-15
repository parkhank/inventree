import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Inventory from './pages/Inventory';
import Items from './pages/Items';

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
      </Switch>
    </BrowserRouter>
  );
}

export default App;
