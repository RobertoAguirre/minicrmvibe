const BASE = import.meta.env.VITE_API_URL ?? '/api';

async function request(path, options = {}) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  });
  if (res.status === 204) return null;
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error ?? res.statusText);
  return data;
}

export const api = {
  contacts: {
    list: () => request('/contacts'),
    get: (id) => request(`/contacts/${id}`),
    create: (body) => request('/contacts', { method: 'POST', body: JSON.stringify(body) }),
    update: (id, body) => request(`/contacts/${id}`, { method: 'PATCH', body: JSON.stringify(body) }),
    delete: (id) => request(`/contacts/${id}`, { method: 'DELETE' }),
  },
};
