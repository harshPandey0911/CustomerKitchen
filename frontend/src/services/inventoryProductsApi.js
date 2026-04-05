import { frontendDataStore } from './frontendDataStore';

export const inventoryProductsApi = {
  list: async () => frontendDataStore.listInventoryProducts(),
  create: async (payload) => frontendDataStore.createInventoryProduct(payload),
  update: async (id, payload) => frontendDataStore.updateInventoryProduct(id, payload),
  remove: async (id) => frontendDataStore.removeInventoryProduct(id),
};
