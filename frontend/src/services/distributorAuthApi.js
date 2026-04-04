const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000').replace(/\/$/, '');

export const distributorAuthApi = {
  login: async (payload) => {
    let response;

    try {
      response = await fetch(`${API_BASE_URL}/api/distributor/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
    } catch {
      throw new Error('Unable to reach the distributor server. Please start the backend and try again.');
    }

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      const error = new Error(data.message || 'Distributor login failed.');
      error.status = response.status;
      throw error;
    }

    return data;
  },
};
