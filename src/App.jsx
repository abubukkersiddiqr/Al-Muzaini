import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import RepeatTransaction from './pages/RepeatTransaction';
import './app.css';
import './styles/login.css';

import './styles/repeat-transaction.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/repeat-transaction" element={<RepeatTransaction />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;