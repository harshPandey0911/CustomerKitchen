import { frontendDataStore } from './frontendDataStore';

export const retailerCustomersApi = {
  list: async () => frontendDataStore.listRetailerCustomers(),
};
