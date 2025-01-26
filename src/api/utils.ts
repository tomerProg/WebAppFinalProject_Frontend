import { AxiosPromise } from 'axios';

export const AbortableRequest = <T>(
    axiosRequest: (aborController: AbortController) => AxiosPromise<T>
) => {
    const abortController = new AbortController();
    const request = axiosRequest(abortController);

    return { request, abort: () => abortController.abort() };
};
