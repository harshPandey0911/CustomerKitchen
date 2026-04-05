import { frontendDataStore } from './frontendDataStore';

export const distributorAuthApi = {
  login: async (payload) => frontendDataStore.authenticateDistributor(payload),
};
