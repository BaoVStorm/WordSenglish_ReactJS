// authService.js
import axios from 'axios';

// Set base Axios instance
const api = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_API, // Your backend URL
});

// Set Authorization header for every request
api.interceptors.request.use((config) => {
    const accessToken: any = localStorage.getItem('accessToken');
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
});

// Handle expired access token automatically
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const refreshToken: any = localStorage.getItem('refreshToken');
        const originalRequest = error.config;

        if (error.response?.status === 401 && refreshToken && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                // Call refresh endpoint
                const res = await api.post('/api/auth/refresh', { refreshToken });

                // Save new token
                const newAccessToken = res.data.accessToken;
                localStorage.setItem('accessToken', newAccessToken);

                // Retry failed request
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                return api(originalRequest);
            } catch (err) {
                console.error('Refresh token expired or invalid');
                logout();
            }
        }

        return Promise.reject(error);
    },
);

export const login = async (username: string, password: string) => {
    try {
        const res = await api.post('/api/auth/login', { username, password });

        localStorage.setItem('accessToken', res.data.accessToken);
        localStorage.setItem('refreshToken', res.data.refreshToken);

        // console.log(res.data);

        return res.data;
    } catch (err: any) {
        // Get backend error message if available
        const message =
            err.response?.data?.msg || // your backend's "msg"
            err.response?.data?.message || // fallback if backend uses "message"
            err.message || // network or Axios error
            'Unknown error occurred';

        // Re-throw with a clean message
        throw new Error(message);
    }
};

export const register = async (username: string, password: string) => {
    try {
        const res = await api.post('/api/auth/register', { username, password });

        localStorage.setItem('accessToken', res.data.accessToken);
        localStorage.setItem('refreshToken', res.data.refreshToken);

        // console.log(res.data);

        return res.data;
    } catch (err: any) {
        // Get backend error message if available
        const message =
            err.response?.data?.msg || // your backend's "msg"
            err.response?.data?.message || // fallback if backend uses "message"
            err.message || // network or Axios error
            'Unknown error occurred';

        // Re-throw with a clean message
        throw new Error(message);
    }
};

export const logout = async () => {
    try {
        await api.post('/api/auth/logout');

        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
    } catch (err: any) {
        // Get backend error message if available
        const message =
            err.response?.data?.msg || // your backend's "msg"
            err.response?.data?.message || // fallback if backend uses "message"
            err.message || // network or Axios error
            'Unknown error occurred';

        // Re-throw with a clean message
        throw new Error(message);
    }
};

export const getProfile = async () => {
    const res = await api.get('/api/auth/profile');
    return res.data;
};

// ------------------- posts

// create Posts
export const createPosts = async (title: string, description: string, vocab_items: any[]) => {
    try {
        const res = await api.post('/api/post/create', {
            title,
            description,
            vocab_items,
        });

        // console.log({
        //     title,
        //     description,
        //     vocab_items,
        // })

        return res.data;
    } catch (err: any) {
        const message =
            err.response?.data?.msg || err.response?.data?.message || err.message || 'Unknown error occurred';

        throw new Error(message);
    }
};

export const getPosts = async (page: number) => {
    try {
        const res = await api.get('/api/post/posts', {
            params: { page },
        });

        return res.data;
    } catch (err: any) {
        const message =
            err.response?.data?.msg || err.response?.data?.message || err.message || 'Unknown error occurred';

        throw new Error(message);
    }
};

export const getVocabItems = async (post_id: string) => {
    try {
        const res = await api.get('/api/vocabItem/vocabItems', {
            params: { post_id },
        });

        return res.data;
    } catch (err: any) {
        const message =
            err.response?.data?.msg || err.response?.data?.message || err.message || 'Unknown error occurred';

        throw new Error(message);
    }
};

export const toggleLove = async (post_id: string) => {
    try {
        const res = await api.post('/api/love/toggleLove', {
            post_id,
        });

        return res.data;
    } catch (err: any) {
        const message =
            err.response?.data?.msg || err.response?.data?.message || err.message || 'Unknown error occurred';

        throw new Error(message);
    }
};
