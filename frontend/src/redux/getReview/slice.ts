import { createSlice } from '@reduxjs/toolkit';
import { Status } from 'redux/getProducts/types';
import { getReviewsFromProfileLS } from 'utils/reviewsLS/getReviewsFromLS';
import {
	fetchAllReviews,
	fetchReviews,
	fetchReviewsInProfile,
	pushReview,
	pushReviewInProfile,
} from './thunks';
import { ReviewsSliceState } from './types';

const { reviewsInProfileFromLS } = getReviewsFromProfileLS();

const initialState: ReviewsSliceState = {
	reviews: [],
	reviewsAll: [],
	reviewsInProfile: reviewsInProfileFromLS,
	reviewsCount: 0,
	addedReview: {
		id: 0,
		productId: 0,
		date: '',
		time: '',
		rating: '0',
		feedbackEmail: '',
		feedbackName: '',
		feedbackMessage: '',
	},
	reviewRating: '5',
	status: Status.LOADING,
	statusAll: Status.LOADING,
	postReviewStatus: Status.LOADING,
	postReviewInProfileStatus: Status.LOADING,
};

const getReviewsSlice = createSlice({
	name: 'reviews',
	initialState,
	reducers: {
		setRating(state, action) {
			state.reviewRating = action.payload;
		},
	},
	extraReducers: builder => {
		builder.addCase(fetchAllReviews.pending, state => {
			state.statusAll = Status.LOADING;
			state.reviewsAll = [];
		});
		builder.addCase(fetchAllReviews.fulfilled, (state, action) => {
			state.statusAll = Status.SUCCESS;
			state.reviewsAll = action.payload.data;
		});
		builder.addCase(fetchAllReviews.rejected, state => {
			state.statusAll = Status.ERROR;
			state.reviewsAll = [];
		});

		builder.addCase(fetchReviews.pending, state => {
			state.status = Status.LOADING;
			state.reviews = [];
		});
		builder.addCase(fetchReviews.fulfilled, (state, action) => {
			state.status = Status.SUCCESS;
			state.reviews = action.payload.data;
			state.reviewsCount = action.payload.headersCount;
		});
		builder.addCase(fetchReviews.rejected, state => {
			state.status = Status.ERROR;
			state.reviews = [];
		});

		builder.addCase(fetchReviewsInProfile.pending, state => {
			state.postReviewInProfileStatus = Status.LOADING;
		});
		builder.addCase(fetchReviewsInProfile.fulfilled, (state, action) => {
			state.postReviewInProfileStatus = Status.SUCCESS;
			state.reviewsInProfile = action.payload;
		});
		builder.addCase(fetchReviewsInProfile.rejected, state => {
			state.postReviewInProfileStatus = Status.ERROR;
		});

		builder.addCase(pushReview.pending, state => {
			state.postReviewStatus = Status.LOADING;
		});
		builder.addCase(pushReview.fulfilled, (state, action) => {
			state.reviews = action.payload.data;
			state.postReviewStatus = Status.SUCCESS;
		});
		builder.addCase(pushReview.rejected, state => {
			state.postReviewStatus = Status.ERROR;
		});

		builder.addCase(pushReviewInProfile.pending, state => {
			state.postReviewInProfileStatus = Status.LOADING;
		});
		builder.addCase(pushReviewInProfile.fulfilled, (state, action) => {
			state.reviewsInProfile = action.payload.data;
			state.postReviewInProfileStatus = Status.SUCCESS;
		});
		builder.addCase(pushReviewInProfile.rejected, state => {
			state.postReviewInProfileStatus = Status.ERROR;
		});
	},
});

export const { setRating } = getReviewsSlice.actions;

export default getReviewsSlice.reducer;
