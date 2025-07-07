import { createAsyncThunk } from '@reduxjs/toolkit';
import { instanceUsers } from 'utils/axios';
import { ILoginData, IRegisterData } from './types';

export const registerUser = createAsyncThunk(
	'auth/register',
	async (newUser: IRegisterData, { rejectWithValue }) => {
		try {
			const res = await instanceUsers.post('/register', newUser);
			const jsonUser = JSON.stringify(res.data);
			localStorage.setItem('user', jsonUser);
			return res.data;
		} catch (error: any) {
			if (error.response && error.response.data.message) {
				return rejectWithValue(error.response.data.message);
			} else {
				return rejectWithValue(error.message);
			}
		}
	}
);

export const loginUser = createAsyncThunk(
	'auth/login',
	async (data: ILoginData, { rejectWithValue }) => {
		try {
			const user = await instanceUsers.post('/login', data);
			if (
				user.data.status === 400 ||
				user.data.status === 401 ||
				user.data.status === 500
			) {
				return user.data.message;
			} else {
				const jsonUser = JSON.stringify(user?.data);
				localStorage.setItem('user', jsonUser);
				return user.data;
			}
		} catch (error: any) {
			if (error.response && error.response.data.message) {
				return rejectWithValue(error.response.data.message);
			} else {
				return rejectWithValue(error.message);
			}
		}
	}
);

export const getUser = createAsyncThunk(
	'getUser',
	async (_, { rejectWithValue }) => {
		try {
			const user = await instanceUsers.get('/getUser');
			return user.data;
		} catch (error: any) {
			if (error.response && error.response.data.message) {
				return rejectWithValue(error.response.data.message);
			} else {
				return rejectWithValue(error.message);
			}
		}
	}
);

export const updateUsername = createAsyncThunk(
	'updateUsername',
	async (data: any, { rejectWithValue }) => {
		try {
			const user = await instanceUsers.patch('/updateUsername', data);
			return user.data;
		} catch (error: any) {
			if (error.response && error.response.data.message) {
				return rejectWithValue(error.response.data.message);
			} else {
				return rejectWithValue(error.message);
			}
		}
	}
);

export const updateUserPassword = createAsyncThunk(
	'updatePassword',
	async (
		data: { oldPassword: string; newPassword: string },
		{ rejectWithValue }
	) => {
		try {
			return await instanceUsers.patch('/updatePassword', data);
		} catch (error: any) {
			if (error.response && error.response.data.message) {
				return rejectWithValue(error.response.data.message);
			} else {
				return rejectWithValue(error.message);
			}
		}
	}
);

export const deleteAccount = createAsyncThunk(
	'delete',
	async (id: any, { rejectWithValue }) => {
		try {
			return instanceUsers.delete('/delete', id);
		} catch (error: any) {
			if (error.response && error.response.data.message) {
				return rejectWithValue(error.response.data.message);
			} else {
				return rejectWithValue(error.message);
			}
		}
	}
);
