import { createAsyncThunk } from '@reduxjs/toolkit';
import { reviewsLimitOnPage } from './consts';
import { instance, instanceUsers } from 'utils/axios';
import axios from 'axios';

export const fetchAllReviews = createAsyncThunk(
	'reviews/fetchAllReviewsStatus',
	async () => {
		const { data } = await instance.get(`http://localhost:3001/reviews`);
		return { data };
	}
);

export const fetchReviews = createAsyncThunk(
	'reviews/fetchReviewsStatus',
	async (params: any) => {
		const page = params.currentPage ? `&_page=${params.currentPage}` : '';
		const limit = `&_limit=${reviewsLimitOnPage}`;
		const { data, headers } = await instance.get(
			`http://localhost:3001/reviews?_sort=id&_order=desc${page}${limit}`
		);
		const headersCount = headers['x-total-count'];
		return { data, headersCount };
	}
);

export const fetchReviewsInProfile = createAsyncThunk(
	'feedback/get-elements',
	async (token: string, { rejectWithValue }) => {
		try {
			const userFeedbacks = await axios
				.create({
					baseURL: 'http://localhost:5000/',
					timeout: 1000,
					headers: {
						'X-Custom-Header': 'foobar',
						Authorization: `Bearer ${token}`,
					},
				})
				.get('feedback/get-elements');
			const jsonUserReviews = JSON.stringify(userFeedbacks?.data);
			localStorage.setItem('userReviews', jsonUserReviews);
			return userFeedbacks.data;
		} catch (error: any) {
			if (error.response && error.response.data.message) {
				return rejectWithValue(error.response.data.message);
			} else {
				return rejectWithValue(error.message);
			}
		}
	}
);

export const pushReview = createAsyncThunk(
	'reviews/pushReview',
	async (data: any, { rejectWithValue }) => {
		try {
			const newReview = instance.post(`reviews`, data);
			return newReview;
		} catch (error: any) {
			if (error.response && error.response.data.message) {
				return rejectWithValue(error.response.data.message);
			} else {
				return rejectWithValue(error.message);
			}
		}
	}
);

export const pushReviewInProfile = createAsyncThunk(
	'feedback/create',
	async (data: any, { rejectWithValue }) => {
		try {
			const newReviewInProfile = instanceUsers.post(`feedback/create`, data);
			return newReviewInProfile;
		} catch (error: any) {
			if (error.response && error.response.data.message) {
				return rejectWithValue(error.response.data.message);
			} else {
				return rejectWithValue(error.message);
			}
		}
	}
);

export const deleteReview = createAsyncThunk(
	'feedback/delete',
	async (data: any, { rejectWithValue }) => {
		try {
			const deleteReviewFromProfile = instanceUsers.delete(
				`feedback/delete-feedback?id=${data.id}`
			);
			return deleteReviewFromProfile;
		} catch (error: any) {
			if (error.response && error.response.data.message) {
				return rejectWithValue(error.response.data.message);
			} else {
				return rejectWithValue(error.message);
			}
		}
	}
);
