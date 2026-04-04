const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000').replace(/\/$/, '');

const parseJson = async (response) => response.json().catch(() => ({}));

export const adminRetailersApi = {
  listLoggedIn: async () => {
    let response;

    try {
      response = await fetch(`${API_BASE_URL}/api/retailers?loggedInOnly=true`);
    } catch {
      throw new Error('Unable to reach the retailer server. Please start the backend and try again.');
    }

    const data = await parseJson(response);

    if (!response.ok) {
      throw new Error(data.message || 'Unable to load retailers.');
    }

    return data;
  },
};
