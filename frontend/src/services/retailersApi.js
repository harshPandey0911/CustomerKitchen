const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000').replace(/\/$/, '');

const parseJson = async (response) => response.json().catch(() => ({}));

const withCreatedBy = (url, createdBy) => {
  const normalizedCreatedBy = String(createdBy || '').trim().toLowerCase();

  if (!normalizedCreatedBy) {
    return url;
  }

  const separator = url.includes('?') ? '&' : '?';
  return `${url}${separator}createdBy=${encodeURIComponent(normalizedCreatedBy)}`;
};

export const retailersApi = {
  list: async (createdBy = '') => {
    let response;

    try {
      response = await fetch(withCreatedBy(`${API_BASE_URL}/api/retailers`, createdBy));
    } catch {
      throw new Error('Unable to reach the retailer server. Please start the backend and try again.');
    }

    const data = await parseJson(response);

    if (!response.ok) {
      throw new Error(data.message || 'Unable to load retailers.');
    }

    return data;
  },
  create: async (payload) => {
    let response;

    try {
      response = await fetch(`${API_BASE_URL}/api/retailers`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
    } catch {
      throw new Error('Unable to reach the retailer server. Please start the backend and try again.');
    }

    const data = await parseJson(response);

    if (!response.ok) {
      throw new Error(data.message || 'Unable to create retailer.');
    }

    return data;
  },
  update: async (id, payload) => {
    let response;

    try {
      response = await fetch(`${API_BASE_URL}/api/retailers/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
    } catch {
      throw new Error('Unable to reach the retailer server. Please start the backend and try again.');
    }

    const data = await parseJson(response);

    if (!response.ok) {
      throw new Error(data.message || 'Unable to update retailer.');
    }

    return data;
  },
  remove: async (id, createdBy = '') => {
    let response;

    try {
      response = await fetch(withCreatedBy(`${API_BASE_URL}/api/retailers/${id}`, createdBy), {
        method: 'DELETE',
      });
    } catch {
      throw new Error('Unable to reach the retailer server. Please start the backend and try again.');
    }

    const data = await parseJson(response);

    if (!response.ok) {
      throw new Error(data.message || 'Unable to delete retailer.');
    }

    return data;
  },
};
