import axios from "axios";

/** Dev: same-origin `/api` → Vite proxy (avoids Chrome CORS to ngrok). Prod: full API URL. */
const baseURL =
  import.meta.env.DEV
    ? "/api"
    : (import.meta.env.VITE_API_BASE_URL ??
      "https://procuratorial-phrenetically-yessenia.ngrok-free.dev/api");

const api = axios.create({
  baseURL,
  headers: {
    ...(import.meta.env.DEV
      ? {}
      : { "ngrok-skip-browser-warning": "true" }),
  },
});

api.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("autocrmtoken");
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (err) => {
    if (
      axios.isAxiosError(err) &&
      err.response?.status === 401 &&
      typeof err.config?.url === "string" &&
      !err.config.url.includes("/auth/login") &&
      localStorage.getItem("autocrmtoken") &&
      window.location.pathname !== "/login"
    ) {
      localStorage.removeItem("autocrmtoken");
      window.location.assign("/login");
    }

    return Promise.reject(err);
  },
);

export default api;
