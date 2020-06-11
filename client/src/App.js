import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Inventory from './pages/Inventory';

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
      </Switch>
    </BrowserRouter>
  );
}

export default App;
