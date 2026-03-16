import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8001/api/', 
}); // Creates a custom axios object ( api.get("login/"); =  http://localhost:8001/api/login/)

// Attach token automatically
api.interceptors.request.use((config) => { // runs before request goes to server
  const token = localStorage.getItem('access');

  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }

  return config;  
}); // if token exists adds header

// Refresh token on 401
api.interceptors.response.use( // runs before server responds
  (res) => res, //if request succeeds returns response 
  async (err) => { // if response fails handles error
    const original = err.config;

    if (err.response?.status === 401 && !original._retry) { // if backend sends 401 (Unauthorized) and haven't retried, refresh token
      original._retry = true;

      const refresh = localStorage.getItem('refresh'); // reads refresh token from local storage

      if (!refresh) {
        window.location.href = "/login";
        return Promise.reject(err);
      }

      try {
        const response = await axios.post(
          `${api.defaults.baseURL}auth/refresh`,
          { refresh }
        );

        localStorage.setItem("access", response.data.access);

        original.headers.Authorization = `Bearer ${response.data.access}`;
        return api(original);
      } catch (refreshError) {
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        window.location.href = "/login"; // session expired, force login again
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(err);
  }
);

export default api;
