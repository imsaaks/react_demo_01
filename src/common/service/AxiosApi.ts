
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { showLoading, hideLoading } from '@common/store/loadingSlice.ts';

const AxiosApi = (isLoading?: boolean) => {

    const dispatch = useDispatch();
    const api = axios.create({
        baseURL: '/api/v1',
        timeout: 60000,
        headers: {
            'Content-Type': 'application/json'
        }
    });

    api.interceptors.request.use((config) => {
        if (isLoading !== false) {
            dispatch(showLoading());
        }
        return config;
    }, (error) => {
        dispatch(hideLoading());
        return Promise.reject(error);
    });

    api.interceptors.response.use((response) => {
        dispatch(hideLoading());
        return response;
    }, (error) => {
        dispatch(hideLoading());
        return Promise.reject(error);
    });

    return api;
};

export default AxiosApi;