import React from 'react';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { routeConst } from 'renderer/common/types/consts/route-const.common';
import { Main } from './components/main.component';
import { Instances } from './components/instances.component';
import { AddInstance } from './components/add-instance.component';
import { InstancePage } from './components/node-overview.component.';
import { DvpnEarning } from './components/dvpn-earning.component';
import { SubscriptionHistory } from './components/subscription-history.component';
import { BandwidthUsage } from './components/bandwidth-usage.component';
import { SessionHistory } from './components/session-history.component';
import './setup';

import './assets/app.css';
import { EditNodeConfig } from './components/edit-node-config.component';

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
        <Route
          path="/earning/:name"
          element={<DvpnEarning />}
        />
        <Route
          path="/history/session/:name"
          element={<SessionHistory />}
        />
        <Route
          path="/history/subscription/:name"
          element={<SubscriptionHistory />}
        />
        <Route
          path="/bandwidth-usage/:name"
          element={<BandwidthUsage />}
        />
        <Route
          path="/edit-node-config/:name"
          element={<EditNodeConfig />}
        />
      </Routes>
    </Router>
  );
};
