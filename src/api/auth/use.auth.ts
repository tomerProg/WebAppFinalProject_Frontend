import {
    AxiosError,
    HttpStatusCode,
    InternalAxiosRequestConfig,
    isAxiosError
} from 'axios';
import { identity } from 'ramda';
import { useLayoutEffect, useState } from 'react';
import apiClient from '../api-client';
import { refreshAuthAccessToken } from './auth-api';

export const useAuth = () => {
    const [token, setToken] = useState<string | null>(null);

    useLayoutEffect(() => {
        const authInterceptor = apiClient.interceptors.request.use(
            (config: InternalAxiosRequestConfig & { _retry?: boolean }) => {
                if (!config._retry && token) {
                    config.headers.Authorization = `JWT ${token}`;
                }
                return config;
            }
        );

        return () => {
            apiClient.interceptors.request.eject(authInterceptor);
        };
    }, [token]);

    useLayoutEffect(() => {
        const refreshInterceptor = apiClient.interceptors.response.use(
            identity,
            async (error: AxiosError | Error) => {
                if (!isAxiosError(error)) {
                    return Promise.reject(error);
                }

                const { config: originalRequest, response } = error;
                if (response?.status === HttpStatusCode.Unauthorized) {
                    try {
                        const {
                            data: { accessToken }
                        } = await refreshAuthAccessToken();

                        setToken(accessToken);
                        if (originalRequest) {
                            originalRequest.headers.Authorization = `JWT ${accessToken}`;
                            return apiClient(originalRequest);
                        }
                    } catch (error) {
                        setToken(null);
                        return Promise.reject(error);
                    }
                }

                return Promise.reject(error);
            }
        );

        return () => {
            apiClient.interceptors.response.eject(refreshInterceptor);
        };
    }, []);

    return { setToken };
};
