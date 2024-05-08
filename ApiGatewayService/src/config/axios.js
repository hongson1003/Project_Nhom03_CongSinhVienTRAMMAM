import axios from "axios";
import axiosRetry from 'axios-retry';
require('dotenv').config();
const baseURL = process.env.BACKEND_URL;
const gateway = require('../config/gateway.config.json');

let isRefresh_token = false;
var new_access_token = null;
var new_refresh_token = null;
var userInfo = null;

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
        const status = error.response?.status;
        if (status === 401) {
            if (!isRefresh_token) {
                isRefresh_token = true;
                // call api refresh token
                try {
                    const root = gateway.services['authentication-service'].url;
                    const path = gateway.routes.reload.path;
                    const authRes = await instance.post(root + path);
                    if (authRes.errCode === 100) {
                        const { access_token, refresh_token, user } = authRes.data;
                        new_access_token = access_token;
                        new_refresh_token = refresh_token;
                        userInfo = user;
                        configAuthorize(access_token, refresh_token, user);
                        isRefresh_token = false;
                    }
                } catch (refreshError) {
                    return true;
                }
            }
            return true;
        }
        return false;
    },
});

// Add a request interceptor
instance.interceptors.request.use(function (config) {
    // Do something before request is sent
    if (new_access_token) {
        const customConfig = { ...config };
        customConfig.headers['Authorization'] = `Bearer ${new_access_token}`;
        customConfig.headers['Refresh-Token'] = new_refresh_token;
        customConfig.headers['user-info'] = JSON.stringify(userInfo) || null;
        return customConfig;
    }
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
        // set user-info to header
        if (user) {
            instance.defaults.headers.common['User-Info'] = JSON.stringify(user);
        }

    } catch (error) {
        next(error);
    }
}

export default instance;
