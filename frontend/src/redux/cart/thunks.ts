import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { instance } from 'utils/axios';
import { CardTypeInCart } from './types';

export const fetchCartInProfile = createAsyncThunk(
	'',
	async (token: string, { rejectWithValue }) => {
		try {
			const userCart = await axios
				.create({
					baseURL: 'http://localhost:5000/',
					timeout: 1000,
					headers: {
						'X-Custom-Header': 'foobar',
						Authorization: `Bearer ${token}`,
					},
				})
				.get('cart/get');
			const jsonUserCart = JSON.stringify(userCart?.data);
			localStorage.setItem('userCart', jsonUserCart);
			return userCart.data;
		} catch (error: any) {
			if (error.response && error.response.data.message) {
				return rejectWithValue(error.response.data.message);
			} else {
				return rejectWithValue(error.message);
			}
		}
	}
);

export const pushCartToProfile = createAsyncThunk(
	'cart/create',
	async (data: CardTypeInCart, { rejectWithValue }) => {
		try {
			const newCartInProfile = instance.post(`cart/create`, data);
			return newCartInProfile;
		} catch (error: any) {
			if (error.response && error.response.data.message) {
				return rejectWithValue(error.response.data.message);
			} else {
				return rejectWithValue(error.message);
			}
		}
	}
);

export const plusCartItemToProfile = createAsyncThunk(
	'cart/plus-item',
	async (data: CardTypeInCart, { rejectWithValue }) => {
		try {
			const newCartInProfile = instance.post(`cart/plus-item`, data);
			return newCartInProfile;
		} catch (error: any) {
			if (error.response && error.response.data.message) {
				return rejectWithValue(error.response.data.message);
			} else {
				return rejectWithValue(error.message);
			}
		}
	}
);

export const minusCartItemToProfile = createAsyncThunk(
	'cart/minus-item',
	async (data: CardTypeInCart, { rejectWithValue }) => {
		try {
			const newCartInProfile = instance.post(`cart/minus`, data);
			return newCartInProfile;
		} catch (error: any) {
			if (error.response && error.response.data.message) {
				return rejectWithValue(error.response.data.message);
			} else {
				return rejectWithValue(error.message);
			}
		}
	}
);

export const clearCartInProfile = createAsyncThunk(
	'cart/clear',
	async (userId: any, { rejectWithValue }) => {
		try {
			return instance.delete('cart', userId);
		} catch (error: any) {
			if (error.response && error.response.data.message) {
				return rejectWithValue(error.response.data.message);
			} else {
				return rejectWithValue(error.message);
			}
		}
	}
);
