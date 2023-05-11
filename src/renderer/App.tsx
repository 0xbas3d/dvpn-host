import React from 'react';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './components/Main';
import Instances from './components/Instances';
import AddInstance from './components/AddInstance';
import InstancePage from './components/InstancePage';

import './App.css';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/instances" element={<Instances />} />
        <Route path="/addInstance" element={<AddInstance />} />
        <Route path="/instance/:name" element={<InstancePage />} />
      </Routes>
    </Router>
  );
}
