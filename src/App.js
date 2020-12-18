import React from 'react';
import Navbar from '../src/components/Navbar';
import { TodosPage } from '../src/pages/TodosPage';
import './App.css';

const App = () => {
  return (
    <div className="App">
      <Navbar />
      <div>
        <TodosPage />
      </div>
    </div>
  );
};

export default App;
