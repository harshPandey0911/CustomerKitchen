const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000').replace(/\/$/, '');

const parseJson = async (response) => response.json().catch(() => ({}));

export const subAdminsApi = {
  list: async () => {
    let response;

    try {
      response = await fetch(`${API_BASE_URL}/api/subadmins`);
    } catch {
      throw new Error('Unable to reach the sub admin server. Please start the backend and try again.');
    }

    const data = await parseJson(response);

    if (!response.ok) {
      throw new Error(data.message || 'Unable to load sub admins.');
    }

    return data;
  },
  create: async (payload) => {
    let response;

    try {
      response = await fetch(`${API_BASE_URL}/api/subadmins`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
    } catch {
      throw new Error('Unable to reach the sub admin server. Please start the backend and try again.');
    }

    const data = await parseJson(response);

    if (!response.ok) {
      throw new Error(data.message || 'Unable to create sub admin.');
    }

    return data;
  },
  remove: async (id) => {
    let response;

    try {
      response = await fetch(`${API_BASE_URL}/api/subadmins/${id}`, {
        method: 'DELETE',
      });
    } catch {
      throw new Error('Unable to reach the sub admin server. Please start the backend and try again.');
    }

    const data = await parseJson(response);

    if (!response.ok) {
      throw new Error(data.message || 'Unable to delete sub admin.');
    }

    return data;
  },
};
