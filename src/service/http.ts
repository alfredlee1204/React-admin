import Axios, { AxiosRequestConfig } from 'axios'

const axios = Axios.create({
    baseURL: 'http://localhost:8888'
});

// 拦截Axios发起的所有请求，通过dispatch修改isLoading为true
axios.interceptors.request.use(
    config => {

        return config;
    },
    err => {
        return Promise.reject(err);
    });
//拦截Axios发起的所有响应，通过dispatch修改isLoading为false
axios.interceptors.response.use((config) => {

    return config
})

export const post = async (url: string,
    data?: any,
    config: AxiosRequestConfig = {}) => {
    const result = await axios.post(url, data, config)
    return result;
}
export const get = async (url: string,
    data?: any,
    config: AxiosRequestConfig = {}) => {
    const result = await axios.get(url, config)
    return result;
}