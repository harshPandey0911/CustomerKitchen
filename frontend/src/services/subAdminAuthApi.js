import { frontendDataStore } from './frontendDataStore';

export const subAdminAuthApi = {
  login: async (payload) => frontendDataStore.authenticateSubAdmin(payload),
};
