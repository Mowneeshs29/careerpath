import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL || "/api";

const api = axios.create({ baseURL: API_BASE });

/* ─── Token Interceptor ─── */
// We store the token in a module-level variable that AuthContext updates.
let _token = null;

export const setToken = (token) => {
  _token = token;
};

api.interceptors.request.use((config) => {
  if (_token) config.headers.Authorization = `Bearer ${_token}`;
  return config;
});

/* ─── Auth ─── */
export const authAPI = {
  register: (data) => api.post("/auth/register", data),
  login: (data) => api.post("/auth/login", data),
  google: (data) => api.post("/auth/google", data),
  me: () => api.get("/auth/me"),
};

/* ─── Profile ─── */
export const profileAPI = {
  get: () => api.get("/profile"),
  update: (data) => api.put("/profile", data),
};

/* ─── Careers ─── */
export const careerAPI = {
  list: (params = {}) => api.get("/careers", { params }),
  getById: (id) => api.get(`/careers/${id}`),
  recommend: () => api.get("/careers/recommend"),
  categories: () => api.get("/careers/categories"),
};

/* ─── Admin ─── */
export const adminAPI = {
  list: () => api.get("/admin/careers"),
  create: (data) => api.post("/admin/careers", data),
  update: (id, data) => api.put(`/admin/careers/${id}`, data),
  remove: (id) => api.delete(`/admin/careers/${id}`),
};

export default api;
