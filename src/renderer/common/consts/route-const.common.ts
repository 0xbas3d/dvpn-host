export const routeConst = {
  internalError: '/500',
  notFoundError: '/404',
  instances: '/instance',
  earning: '/earning',
  sessionHistory: '/history/session',
  subscriptionHistory: '/history/subscription',
  bandwidthUsage: '/bandwidth-usage',
  addInstance: '/add-instance',
  editNodeConfig: '/edit-node-config',
  instanceOverview: (instanceName: string) => {
    return [routeConst.instances, instanceName].join('/');
  },
  instanceEarning: (instanceName: string) => {
    return [routeConst.earning, instanceName].join('/');
  },
  instanceSessionHistory: (instanceName: string) => {
    return [routeConst.sessionHistory, instanceName].join('/');
  },
  instanceSubscriptionHistory: (instanceName: string) => {
    return [routeConst.subscriptionHistory, instanceName].join('/');
  },
  instanceBandwidthUsage: (instanceName: string) => {
    return [routeConst.bandwidthUsage, instanceName].join('/');
  },
  instanceEditNodeConfig: (instanceName: string) => {
    return [routeConst.editNodeConfig, instanceName].join('/');
  },
};
