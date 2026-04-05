import { frontendDataStore } from './frontendDataStore';

export const adminRetailersApi = {
  listLoggedIn: async () => frontendDataStore.listLoggedInRetailers(),
};
