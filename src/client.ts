// ** third parties
import axios from 'axios';

const API_KEY = process.env.CUFINDER_API_KEY;

const apiClient = axios.create({
    baseURL: 'https://api.cufinder.io/v2',
    timeout: 60000,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': 'cufinder-mcp/1.0.0',
        'x-api-key': API_KEY,
    },
});

apiClient.interceptors.request.use((config) => {
    return config;
});

apiClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        return Promise.reject(error);
    },
);

export default apiClient;
