import React from 'react';
import { Route } from 'react-router-dom';
import FormAddProduct from "./componentes/addProduct.jsx"
import './App.css';

function App() {
  return (
    <div className="App">
      <Route 
        exact path= "/products/agregarproducto"
        component={FormAddProduct}
      />
    </div>
  );
}

export default App;
