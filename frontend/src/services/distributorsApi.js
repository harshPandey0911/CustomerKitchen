import { frontendDataStore } from './frontendDataStore';

export const distributorsApi = {
  list: async () => frontendDataStore.listDistributors(),
  create: async (payload) => frontendDataStore.createDistributor(payload),
  update: async (id, payload) => frontendDataStore.updateDistributor(id, payload),
  remove: async (id) => frontendDataStore.removeDistributor(id),
};
