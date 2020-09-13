import React from 'react';
import './App.css';
import Form from './components/formAddProduct';
import NavBar from './components/NavBar';

function App() {
  return (
    <div className="App">
      <NavBar/>
      <Form/>
    </div>
  );
}

export default App;
