export const routeConst = {
  internalError: '/500',
  notFoundError: '/404',
  instances: '/instance',
  addInstance: '/add-instance',

  instance: (instanceName: string) => {
    return [routeConst.instances, instanceName].join('/');
  },
  earning: (instanceName: string) => {
    return ['/earnings', instanceName].join('/');
  },
  sessionHistory: (instanceName: string) => {
    return ['/history/session', instanceName].join('/');
  },
  subscriptionHistory: (instanceName: string) => {
    return ['/history/subscription', instanceName].join('/');
  },
  bandwidthUsage: (instanceName: string) => {
    return ['/bandwidth-usage', instanceName].join('/');
  },
};
