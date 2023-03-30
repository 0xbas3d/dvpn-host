import React from 'react';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './Main';
export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
      </Routes>
    </Router>
  );
}
