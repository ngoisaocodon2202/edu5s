const API_BASE = '/api';

async function request(path, options = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    ...options,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.error || data.message || `API Error (${res.status})`);
  }
  return data;
}

export const api = {
  // Bootstrap all initial data from PostgreSQL
  getBootstrap: () => request('/bootstrap'),
  getHealth: () => request('/health'),

  // Auth
  register: (payload) =>
    request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),
  login: (payload) =>
    request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),
  googleAuth: (payload) =>
    request('/auth/google', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),

  // Courses CRUD (PostgreSQL)
  getCourses: () => request('/courses'),
  createCourse: (course) =>
    request('/courses', {
      method: 'POST',
      body: JSON.stringify(course),
    }),
  updateCourse: (id, course) =>
    request(`/courses/${encodeURIComponent(id)}`, {
      method: 'PUT',
      body: JSON.stringify(course),
    }),
  deleteCourse: (id) =>
    request(`/courses/${encodeURIComponent(id)}`, {
      method: 'DELETE',
    }),

  // Users CRUD (PostgreSQL)
  getUsers: () => request('/users'),
  updateUser: (id, payload) =>
    request(`/users/${encodeURIComponent(id)}`, {
      method: 'PUT',
      body: JSON.stringify(payload),
    }),
  deleteUser: (id) =>
    request(`/users/${encodeURIComponent(id)}`, {
      method: 'DELETE',
    }),

  // SePay Orders (PostgreSQL)
  getOrders: () => request('/orders'),
  createOrder: (payload) =>
    request('/orders', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),
  getOrderByCode: (orderCode) =>
    request(`/orders/${encodeURIComponent(orderCode)}`),
  approveOrder: (id, transactionId) =>
    request(`/orders/${encodeURIComponent(id)}/approve`, {
      method: 'PUT',
      body: JSON.stringify({ transactionId }),
    }),

  // Articles & Settings (PostgreSQL)
  createArticle: (article) =>
    request('/articles', {
      method: 'POST',
      body: JSON.stringify(article),
    }),
  deleteArticle: (id) =>
    request(`/articles/${encodeURIComponent(id)}`, {
      method: 'DELETE',
    }),
  updateSepayConfig: (config) =>
    request('/settings/sepay', {
      method: 'PUT',
      body: JSON.stringify(config),
    }),
};

