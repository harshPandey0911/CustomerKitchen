import { frontendDataStore } from './frontendDataStore';

export const customerAuthApi = {
  register: async (payload) => frontendDataStore.registerCustomer(payload),
  login: async (payload) => frontendDataStore.authenticateCustomer(payload),
};
