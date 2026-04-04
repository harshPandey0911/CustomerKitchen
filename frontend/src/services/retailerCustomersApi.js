const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000').replace(/\/$/, '');

export const retailerCustomersApi = {
  list: async () => {
    let response;

    try {
      response = await fetch(`${API_BASE_URL}/api/customers`);
    } catch {
      throw new Error('Unable to reach the customer server. Please start the backend and try again.');
    }

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new Error(data.message || 'Unable to load customers.');
    }

    return data;
  },
};
