import { frontendDataStore } from './frontendDataStore';

export const serviceRequestsApi = {
  list: async (customerEmail = '') => frontendDataStore.listServiceRequests(customerEmail),
  create: async (payload) => frontendDataStore.createServiceRequest(payload),
};
