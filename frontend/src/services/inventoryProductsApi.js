const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000').replace(/\/$/, '');

const parseJson = async (response) => response.json().catch(() => ({}));

export const inventoryProductsApi = {
  list: async () => {
    let response;

    try {
      response = await fetch(`${API_BASE_URL}/api/inventory-products`);
    } catch {
      throw new Error('Unable to reach the inventory server. Please start the backend and try again.');
    }

    const data = await parseJson(response);

    if (!response.ok) {
      throw new Error(data.message || 'Unable to load inventory products.');
    }

    return data;
  },
  create: async (payload) => {
    let response;

    try {
      response = await fetch(`${API_BASE_URL}/api/inventory-products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
    } catch {
      throw new Error('Unable to reach the inventory server. Please start the backend and try again.');
    }

    const data = await parseJson(response);

    if (!response.ok) {
      throw new Error(data.message || 'Unable to create inventory product.');
    }

    return data;
  },
  update: async (id, payload) => {
    let response;

    try {
      response = await fetch(`${API_BASE_URL}/api/inventory-products/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
    } catch {
      throw new Error('Unable to reach the inventory server. Please start the backend and try again.');
    }

    const data = await parseJson(response);

    if (!response.ok) {
      throw new Error(data.message || 'Unable to update inventory product.');
    }

    return data;
  },
  remove: async (id) => {
    let response;

    try {
      response = await fetch(`${API_BASE_URL}/api/inventory-products/${id}`, {
        method: 'DELETE',
      });
    } catch {
      throw new Error('Unable to reach the inventory server. Please start the backend and try again.');
    }

    const data = await parseJson(response);

    if (!response.ok) {
      throw new Error(data.message || 'Unable to delete inventory product.');
    }

    return data;
  },
};
