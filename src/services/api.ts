import axios from "axios";

const api = axios.create({
  // baseURL: import.meta.env.REACT_APP__PUBLIC_API_BASE_URL,
  baseURL: "https://procuratorial-phrenetically-yessenia.ngrok-free.dev/api",
  headers: {
    "ngrok-skip-browser-warning": "true", 
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
  async (err) => {
    // const originalRequest = err.config;

    // if (err.response?.status === 401 && !originalRequest._retry) {
    //   window.location.href = "/login";
    //   localStorage.removeItem("automarketToken");
    // }

    return Promise.reject(err);
  },
);

export default api;
