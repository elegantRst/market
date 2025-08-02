import axios from 'axios';

export const instance = axios.create({
	baseURL: 'http://localhost:5000/api',
	timeout: 1000,
	headers: { 'X-Custom-Header': 'foobar' },
});

export const instanceCart = axios.create({
	baseURL: 'http://localhost:5000/api/cart',
});
instanceCart.interceptors.request.use(config => {
	const user = localStorage.getItem('user');
	const token = user ? JSON.parse(user)?.access_token : '';
	config.headers.Authorization = `Bearer ${token}`;
	return config;
});

export const instanceUsers = axios.create({
	baseURL: 'http://localhost:5000/api/users',
});
instanceUsers.interceptors.request.use(config => {
	const user = localStorage.getItem('user');
	const token = user ? JSON.parse(user)?.access_token : '';
	config.headers.Authorization = `Bearer ${token}`;
	return config;
});

export const instanceFeedbacks = axios.create({
	baseURL: 'http://localhost:5000/api/feedbacks',
});
instanceFeedbacks.interceptors.request.use(config => {
	const user = localStorage.getItem('user');
	const token = user ? JSON.parse(user)?.access_token : '';
	config.headers.Authorization = `Bearer ${token}`;
	return config;
});
