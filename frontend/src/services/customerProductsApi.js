import { frontendDataStore } from './frontendDataStore';

export const customerProductsApi = {
  list: async (customerEmail = '') => frontendDataStore.listCustomerProducts(customerEmail),
  register: async (payload) => frontendDataStore.registerCustomerProduct(payload),
};
