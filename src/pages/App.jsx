// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdDisplay from './components/AdDisplay';
import AdControlPanel from './components/AdControlPanel';
import Layout from './Layout';

function App() {
  return (
    <Layout>
      <h2 className="text-xl font-semibold">Welcome to the Dashboard</h2>
      <p className="mt-4">This is your main content area.</p>
    </Layout>
  );
}

export default App;
