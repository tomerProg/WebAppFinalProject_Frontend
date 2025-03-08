import { AxiosError, HttpStatusCode, isAxiosError } from 'axios';
import { identity, isNil } from 'ramda';
import { useCallback, useLayoutEffect, useState } from 'react';
import { NavigateFunction } from 'react-router-dom';
import { PAGES_ROUTES } from '../../routes/routes.const';
import apiClient from '../api-client';
import { refreshAuthAccessToken } from './auth-api';
import {
    RetriableInternalAxiosRequestConfig,
    SetAccessTokenFunction
} from './types';

const applyAuthTokenToConfig = (
    config: RetriableInternalAxiosRequestConfig,
    token: string | null
) => {
    if (!config._retry && token) {
        config.headers.Authorization = `JWT ${token}`;
    }
    return config;
};

const requestRefresh = async (
    originalRequest: RetriableInternalAxiosRequestConfig
) => {
    const {
        data: { accessToken }
    } = await refreshAuthAccessToken();
    originalRequest.headers.Authorization = `JWT ${accessToken}`;
    originalRequest._retry = true;
    return { accessToken, refreshedRequest: originalRequest };
};

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
        const authInterceptor = apiClient.interceptors.request.use((config) =>
            applyAuthTokenToConfig(config, token)
        );

        return () => {
            apiClient.interceptors.request.eject(authInterceptor);
        };
    }, [token]);

    useLayoutEffect(() => {
        let isRefreshing = false;
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
                        if (isRefreshing) {
                            await new Promise((res) => setTimeout(res, 100));
                            return apiClient(originalRequest);
                        }

                        isRefreshing = true;
                        const { accessToken, refreshedRequest } =
                            await requestRefresh(originalRequest);
                        isRefreshing = false;
                        setAccessToken(accessToken);
                        
                        return apiClient(refreshedRequest);
                    } catch (error) {
                        setAccessToken(null);
                        console.error('refresh token error:', error);

                        return navigate(PAGES_ROUTES.LOGIN);
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
