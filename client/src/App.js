import React from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import Form from './components/formAddProduct';
import NavBar from './components/NavBar';
import List from './components/list';

function App() {
  return (
    <div className="App">
      <Route
      path='/'
      component={NavBar}
      />
      <Route
      exact path='/addProduct'
      component={Form}
      /> 
      <Route
      exact path='/list'
      component={List}
      />
    </div>
  );
}

export default App;
