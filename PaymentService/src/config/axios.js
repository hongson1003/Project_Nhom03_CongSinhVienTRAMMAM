import axios from "axios";
import axiosRetry from 'axios-retry';
require('dotenv').config();
const baseURL = process.env.BACKEND_URL;

const instance = axios.create({
    baseURL: baseURL,
    withCredentials: true,
});

instance.defaults.headers.common['Authorization'] = '';


axiosRetry(instance, {
    retries: 3, // number of retries
    retryDelay: (retryCount) => {
        console.log(`retry attempt: ${retryCount}`);
        return retryCount * 500; // time interval between retries
    },
    retryCondition: async (error) => {
        // if retry condition is not specified, by default idempotent requests are retried

        return false;
    },
});

// Add a request interceptor
instance.interceptors.request.use(function (config) {
    // Do something before request is sent
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
instance.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return Number.isInteger(response.errCode) ? response : response.data;
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
});


export async function configAuthorize(access_token, refresh_token, user) {
    try {
        instance.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
        instance.defaults.headers.common['Refresh-Token'] = refresh_token;
        if (user) {
            instance.defaults.headers.common['User-Info'] = JSON.stringify(user);
        }
    } catch (error) {
        next(error);
    }
}

export default instance;
