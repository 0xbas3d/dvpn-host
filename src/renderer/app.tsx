import React from 'react';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { routeConst } from 'renderer/common/types/consts/route-const.common';
import { Main } from './components/main.component';
import { Instances } from './components/instances.component';
import { AddInstance } from './components/add-instance.component';
import { InstancePage } from './components/instance-page.component.';

import './assets/app.css';

export const App = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<Main />}
        />
        <Route
          path={routeConst.instances}
          element={<Instances />}
        />
        <Route
          path={routeConst.addInstance}
          element={<AddInstance />}
        />
        <Route
          path="/instance/:name"
          element={<InstancePage />}
        />
      </Routes>
    </Router>
  );
};
