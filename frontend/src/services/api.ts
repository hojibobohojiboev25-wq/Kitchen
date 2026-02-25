import axios from 'axios';

const API = axios.create({
  baseURL: '/api',
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authApi = {
  login: (email: string, password: string) =>
    API.post('/auth/login', { email, password }),
  register: (email: string, password: string, name: string) =>
    API.post('/auth/register', { email, password, name }),
  verify: () => API.get('/auth/verify'),
};

export const recipeApi = {
  getAll: () => API.get('/recipes'),
  getById: (id: string) => API.get(`/recipes/${id}`),
  create: (recipe: any) => API.post('/recipes', recipe),
  update: (id: string, recipe: any) => API.put(`/recipes/${id}`, recipe),
  delete: (id: string) => API.delete(`/recipes/${id}`),
  scale: (id: string, portions: number) =>
    API.post(`/recipes/${id}/scale`, { portions }),
};

export const inventoryApi = {
  getAll: () => API.get('/inventory'),
  getLowStock: () => API.get('/inventory/low-stock'),
  getById: (id: string) => API.get(`/inventory/${id}`),
  create: (product: any) => API.post('/inventory', product),
  update: (id: string, product: any) => API.put(`/inventory/${id}`, product),
  deduct: (id: string, quantity: number, reason: string) =>
    API.post(`/inventory/${id}/deduct`, { quantity, reason }),
  delete: (id: string) => API.delete(`/inventory/${id}`),
};

export const orderApi = {
  getAll: () => API.get('/orders'),
  getPending: () => API.get('/orders/pending'),
  getById: (id: string) => API.get(`/orders/${id}`),
  create: (order: any) => API.post('/orders', order),
  updateStatus: (id: string, status: string) =>
    API.put(`/orders/${id}/status`, { status }),
  complete: (id: string) => API.put(`/orders/${id}/complete`),
};

export const analyticsApi = {
  getDashboard: () => API.get('/analytics/dashboard'),
  getRecipeProfitability: () => API.get('/analytics/recipes/profitability'),
  getSupplierAnalytics: () => API.get('/analytics/suppliers'),
  getDailySalesReport: (days?: number) =>
    API.get('/analytics/sales/report', { params: { days } }),
  getInventoryValue: () => API.get('/analytics/inventory/value'),
};

