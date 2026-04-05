import { frontendDataStore } from './frontendDataStore';

export const retailersApi = {
  list: async (createdBy = '') => frontendDataStore.listRetailers(createdBy),
  create: async (payload) => frontendDataStore.createRetailer(payload),
  update: async (id, payload) => frontendDataStore.updateRetailer(id, payload),
  remove: async (id, createdBy = '') => frontendDataStore.removeRetailer(id, createdBy),
};
