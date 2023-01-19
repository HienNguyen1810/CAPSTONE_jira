import axios from 'axios';
import EventBus from '../utils/EventBus';

const baseUrl = 'https://jiranew.cybersoft.edu.vn/api/';
const getToken = () => JSON.parse(localStorage.getItem('token'));

const axiosClient = axios.create({
	baseURL: baseUrl,
	headers: {
		'Content-Type': 'application/json',
		TokenCybersoft: import.meta.env.VITE_TOKEN_CYBERSOFT,
	},
});
// export const cancelTokenSource = axios.CancelToken.source();
// Add a request interceptor
axiosClient.interceptors.request.use(
	function (config) {
		// config.cancelToken = cancelTokenSource.token;
		config.headers['Authorization'] = `Bearer ${getToken()}`;
		return config;
	},
	function (error) {
		return Promise.reject(error);
	}
);

// Add a response interceptor
axiosClient.interceptors.response.use(
	function (response) {
		return response;
	},
	function (error) {
		if (error.message === 'Network Error') {
			EventBus.dispatch('logout');
		}

		return Promise.reject(error);
	}
);

export default axiosClient;
