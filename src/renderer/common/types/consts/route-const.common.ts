export const routeConst = {
  internalError: '/500',
  notFoundError: '/404',
  instances: '/instance',
  addInstance: '/add-instance',
  dvpnEarings: '/earnings',
  sessionHistories: '/history/session',
  subscriptionHistories: '/history/subscription',
  bandwidthUsages: '/bandwidth-usage',
  instance: (instanceName: string) => {
    return [routeConst.instances, instanceName].join('/');
  },
  earing: (instanceName: string) => {
    return [routeConst.dvpnEarings, instanceName].join('/');
  },
  sessionHistory: (instanceName: string) => {
    return [routeConst.sessionHistories, instanceName].join('/');
  },
  subscriptionHistory: (instanceName: string) => {
    return [routeConst.subscriptionHistories, instanceName].join('/');
  },
  bandwidthUsage: (instanceName: string) => {
    return [routeConst.bandwidthUsages, instanceName].join('/');
  },
};
