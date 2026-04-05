import { frontendDataStore } from './frontendDataStore';

export const subAdminsApi = {
  list: async () => frontendDataStore.listSubAdmins(),
  create: async (payload) => frontendDataStore.createSubAdmin(payload),
  remove: async (id) => frontendDataStore.removeSubAdmin(id),
};
