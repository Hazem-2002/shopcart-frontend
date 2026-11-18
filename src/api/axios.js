import axios from "axios";
import { store } from "../app/store";
import { logout } from "../features/auth/thunks/logout";
import { setAccessToken } from "../features/auth/authSlice";
import { navigateTo } from "../utils/navigation";

const baseURL = "/api/v1";

const apiInstance = axios.create({
  baseURL,
  timeout: 10000,
  withCredentials: true,
});

// Prevent multiple refresh requests at the same time
let refreshPromise = null;

// Request Interceptor
apiInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    const CSRFToken = localStorage.getItem("CSRFToken");

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    if (CSRFToken) {
      config.headers["x-csrf-token"] = CSRFToken;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

// Response Interceptor
apiInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status !== 401 ||
      !originalRequest ||
      originalRequest._retry ||
      originalRequest.url?.includes("/auth/login") ||
      originalRequest.url?.includes("/auth/refresh-token")
    ) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    try {
      if (!refreshPromise) {
        refreshPromise = axios
          .post(`${baseURL}/auth/refresh-token`, {}, { withCredentials: true })
          .then((response) => {
            const { accessToken } = response.data.data;

            // Update Redux
            store.dispatch(setAccessToken(accessToken));

            // Update localStorage
            localStorage.setItem("accessToken", accessToken);

            return accessToken;
          })
          .finally(() => {
            refreshPromise = null;
          });
      }

      const newAccessToken = await refreshPromise;

      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

      return apiInstance(originalRequest);
    } catch (refreshError) {
      store.dispatch(logout());
      navigateTo("/login", { replace: true });
      return Promise.reject(refreshError);
    }
  },
);

const api = {
  get: (url, config = {}) =>
    apiInstance.get(url, config).then((res) => res.data),

  post: (url, data, config = {}) =>
    apiInstance.post(url, data, config).then((res) => res.data),

  patch: (url, data, config = {}) =>
    apiInstance.patch(url, data, config).then((res) => res.data),

  put: (url, data, config = {}) =>
    apiInstance.put(url, data, config).then((res) => res.data),

  delete: (url, config = {}) =>
    apiInstance.delete(url, config).then((res) => res.data),
};

export default api;
