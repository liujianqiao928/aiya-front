import axios from 'axios';

// 创建 axios 实例
const service = axios.create({
    baseURL: 'https://api.example.com', // 请求的基础路径
    timeout: 5000, // 请求超时时间
});

// 请求拦截器
service.interceptors.request.use(
    config => {
        // 在发送请求之前做些什么
        const token = localStorage.getItem('token'); // 从 localStorage 中获取 token
        if (token) {
            // 如果 token 存在，则在请求头中携带 token
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        // 处理请求错误
        return Promise.reject(error);
    }
);

// 响应拦截器
service.interceptors.response.use(
    response => {
        // 2xx 范围内的状态码都会触发该函数
        return response.data;
    },
    error => {
        // 超出 2xx 范围的状态码都会触发该函数
        if (error.response) {
            // 可以在这里处理不同的 HTTP 状态码
            switch (error.response.status) {
                case 401:
                    // 未授权，可以做登出操作或者跳转到登录页
                    break;
                case 403:
                    // 无权限访问
                    break;
                case 500:
                    // 服务器错误
                    break;
                default:
                    console.error(error.response.data.message || 'Error');
            }
        } else {
            // 处理没有响应的情况，比如断网
            console.error('Network Error');
        }
        return Promise.reject(error);
    }
);

export default service;
