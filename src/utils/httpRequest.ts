import axios from 'axios';

type RequestOptions = {
    params?: Record<string, any>;
    headers?: Record<string, any>;
    [key: string]: any;
};

const httpRequest = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
});

export const get = async <T = any>(path: string, options: RequestOptions = {}): Promise<T> => {
    const response = await httpRequest.get(path, options);
    return response.data;
};

export const post = async <T = any>(path: string, data: any, options: RequestOptions = {}): Promise<T> => {
    const respone = await httpRequest.post<T>(path, data, options);
    return respone.data;
}

export default httpRequest;
