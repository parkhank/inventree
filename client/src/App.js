import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Inventory from './pages/Inventory';

const App = () => {
  return (
    <BrowserRouter>
      <Navigation />
      <Inventory />
    </BrowserRouter>
  );
}

export default App;
