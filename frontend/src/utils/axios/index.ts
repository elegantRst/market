import axios from 'axios';

// const user: any = localStorage.getItem('user');
// const userData = JSON.parse(user);
// export const token = userData?.token;

export const instance = axios.create({
	baseURL: 'http://localhost:5000/api',
	timeout: 1000,
	headers: { 'X-Custom-Header': 'foobar' },
});

export const instanceUsers = axios.create({
	baseURL: 'http://localhost:5000/api/users',
});
instanceUsers.interceptors.request.use(config => {
	const user = localStorage.getItem('user');
	const token = user ? JSON.parse(user)?.token : '';
	config.headers.Authorization = `Bearer ${token}`;
	return config;
});
