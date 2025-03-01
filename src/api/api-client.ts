import axios from 'axios';

const backendURL = import.meta.env.VITE_BACKEND_URL;

const apiClient = axios.create({
    baseURL: backendURL,
    withCredentials: true
});

export default apiClient;
