import axios, { type AxiosRequestConfig } from 'axios'
import {storage} from "@/lib/stoarge.ts";

const instance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

instance.interceptors.request.use(
    async (config) => {
        const token = await storage.get('accessToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

instance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // 토큰 만료
            storage.remove('accessToken');
            window.location.href = '/auth/login';
        }
        return Promise.reject(error);
    }
);

// Orval mutator function
export const axiosInstance = <T = any>(
    config: AxiosRequestConfig,
    options?: AxiosRequestConfig & { signal?: AbortSignal },
): Promise<T> => {
    const controller = new AbortController();
    const signal = options?.signal ?? controller.signal;

    const promise: any = instance({ ...config, ...options, signal }).then(
        ({ data }) => data as T,
    );

    promise.cancel = () => controller.abort();

    return promise;
};

export default instance;