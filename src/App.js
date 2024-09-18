// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './Components/Dashboard';
import AnonymousPasswordCheck from './Components/PasswordCheck';
import AllBreachData from './Components/EmailBreach';
import DomainSpecificBreach from './Components/DomainBreaches';
import EmailBreachAnalytics from './Components/BreachAnalytics';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/anonymous-password-check" element={<AnonymousPasswordCheck />} />
        <Route path="/all-breach-data" element={<AllBreachData />} />
        <Route path="/domain-specific-breach" element={<DomainSpecificBreach />} />
        <Route path="/email-breach-analytics" element={<EmailBreachAnalytics />} />
      </Routes>
    </Router>
  );
};

export default App;