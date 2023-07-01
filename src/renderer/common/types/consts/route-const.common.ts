export const routeConst = {
  internalError: '/500',
  notFoundError: '/404',
  instances: '/instance',
  addInstance: '/add-instance',
  dvpnEarings: '/dvpn-earings',
  sessionHis: '/session-history',
  subscriptionHis: '/subscription-history',
  bandwidthUse: '/bandwidth-usage',
  instance: (instanceName: string) => {
    return [routeConst.instances, instanceName].join('/');
  },
  dvpnEaring: (instanceName: string) => {
    return [routeConst.dvpnEarings, instanceName].join('/');
  },
  sessionHistory: (instanceName: string) => {
    return [routeConst.sessionHis, instanceName].join('/');
  },
  subscriptionHistory: (instanceName: string) => {
    return [routeConst.subscriptionHis, instanceName].join('/');
  },
  bandwidthUsage: (instanceName: string) => {
    return [routeConst.bandwidthUse, instanceName].join('/');
  },
};
