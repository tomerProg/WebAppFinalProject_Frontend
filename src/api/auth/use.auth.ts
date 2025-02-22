import { AxiosError, HttpStatusCode, isAxiosError } from 'axios';
import { identity, isNil } from 'ramda';
import { useCallback, useLayoutEffect, useState } from 'react';
import { NavigateFunction } from 'react-router-dom';
import apiClient from '../api-client';
import { refreshAuthAccessToken } from './auth-api';
import {
    RetriableInternalAxiosRequestConfig,
    SetAccessTokenFunction
} from './types';

export const useAuth = (navigate: NavigateFunction) => {
    const [token, setToken] = useState<string | null>(
        localStorage.getItem('accessToken')
    );

    const setAccessToken: SetAccessTokenFunction = useCallback(
        (token: string | null) => {
            if (token) {
                localStorage.setItem('accessToken', token);
            }
            setToken(token);
        },
        []
    );

    useLayoutEffect(() => {
        const authInterceptor = apiClient.interceptors.request.use(
            (config: RetriableInternalAxiosRequestConfig) => {
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

                const { config, response } = error;
                if (isNil(config)) {
                    return Promise.reject('no request or response ');
                }

                const originalRequest: RetriableInternalAxiosRequestConfig =
                    config;
                if (
                    response?.status === HttpStatusCode.Unauthorized &&
                    !originalRequest._retry
                ) {
                    try {
                        const {
                            data: { accessToken }
                        } = await refreshAuthAccessToken();

                        setAccessToken(accessToken);
                        originalRequest.headers.Authorization = `JWT ${accessToken}`;
                        originalRequest._retry = true;

                        return apiClient(originalRequest);
                    } catch (error) {
                        setAccessToken(null);
                        console.error('refresh token error:', error);

                        return navigate('/');
                    }
                }

                return Promise.reject(error);
            }
        );

        return () => {
            apiClient.interceptors.response.eject(refreshInterceptor);
        };
    }, [navigate, token, setAccessToken]);

    return {
        setAccessToken
    };
};
