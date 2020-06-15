import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Inventory from './pages/Inventory';
import NewItem from './pages/NewItem';

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
          path="/new-item"
          component={NewItem} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
