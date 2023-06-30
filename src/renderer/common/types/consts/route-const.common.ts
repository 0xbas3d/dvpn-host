export const routeConst = {
  internalError: '/500',
  notFoundError: '/404',
  instances: '/instance',
  addInstance: '/add-instance',
  instance: (instanceName: string) => {
    return [routeConst.instances, instanceName].join('/');
  },
};
