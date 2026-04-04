const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000').replace(/\/$/, '');

const parseJson = async (response) => response.json().catch(() => ({}));

const withCustomerEmail = (url, customerEmail) => {
  const normalizedEmail = String(customerEmail || '').trim().toLowerCase();

  if (!normalizedEmail) {
    return url;
  }

  const separator = url.includes('?') ? '&' : '?';
  return `${url}${separator}customerEmail=${encodeURIComponent(normalizedEmail)}`;
};

export const customerProductsApi = {
  list: async (customerEmail = '') => {
    let response;

    try {
      response = await fetch(withCustomerEmail(`${API_BASE_URL}/api/customer-products`, customerEmail));
    } catch {
      throw new Error('Unable to reach the product registration server. Please start the backend and try again.');
    }

    const data = await parseJson(response);

    if (!response.ok) {
      throw new Error(data.message || 'Unable to load registered products.');
    }

    return data;
  },
  register: async (payload) => {
    let response;

    try {
      response = await fetch(`${API_BASE_URL}/api/customer-products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
    } catch {
      throw new Error('Unable to reach the product registration server. Please start the backend and try again.');
    }

    const data = await parseJson(response);

    if (!response.ok) {
      throw new Error(data.message || 'Unable to register product.');
    }

    return data;
  },
};
