import { frontendDataStore } from './frontendDataStore';

export const retailerAuthApi = {
  login: async (payload) => frontendDataStore.authenticateRetailer(payload),
};
