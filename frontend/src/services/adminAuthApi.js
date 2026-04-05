import { frontendDataStore } from './frontendDataStore';

export const adminAuthApi = {
  login: async (payload) => frontendDataStore.authenticateAdmin(payload),
};
