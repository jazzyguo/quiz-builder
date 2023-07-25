import Axios, { InternalAxiosRequestConfig } from 'axios';
import { getAuth } from 'firebase/auth';
import app from '@/firebase/config';
import { API_URL } from '@/config';

const auth = getAuth(app);

// set up axios interceptor to add bearer token from firebase auth
const authRequestInterceptor = (config: InternalAxiosRequestConfig<any>) => {
    // @ts-ignore
    const token = auth?.currentUser?.accessToken;
    if (token) {
        config.headers.authorization = `Bearer ${token}`;
    }
    config.headers.Accept = 'application/json';
    return config;
};

export const axios = Axios.create({
    baseURL: API_URL,
});

axios.interceptors.request.use(authRequestInterceptor);
axios.interceptors.response.use(
    (response) => {
        return response.data;
    },
    (error) => {
        return Promise.reject(error);
    }
);
