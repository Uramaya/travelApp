import Axios, { InternalAxiosRequestConfig } from "axios";
import { API_BASE_URL } from "@/const/api"

const axios = Axios.create({
    baseURL: API_BASE_URL,
});

axios.interceptors.request.use(authRequestInterceptor);

axios.interceptors.response.use(response => {
    return response;
}, error => {
    return Promise.reject(error);
}
)


/**
 * to set the request authorization header
 * 
 * @param config
 * @return 設定したヘッダー
 */
function authRequestInterceptor(config: InternalAxiosRequestConfig) {
    // アクセストークンの設定
    // const token = getToken();

    // if (token) {
    //     config.headers.Authorization = token;
    // }

    config.headers.Accept = "application/json";
    return config;
}

export default axios

