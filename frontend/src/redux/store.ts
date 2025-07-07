import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import authSlice from './auth/slice';
import cartSlice from './cart/slice';
import filtersSlice from './filters/slice';
import getBlogSlice from './getBlog/slice';
import getGraphicsSlice from './getGraphics/slice';
import getProductsSlice from './getProducts/slice';
import getReviewsSlice from './getReview/slice';
import getShowroomSlice from './getShowroom/slice';
import notificationSlice from './notification/slice';

export const store = configureStore({
	reducer: {
		products: getProductsSlice,
		cart: cartSlice,
		filters: filtersSlice,
		showroom: getShowroomSlice,
		reviews: getReviewsSlice,
		blog: getBlogSlice,
		auth: authSlice,
		graphics: getGraphicsSlice,
		notification: notificationSlice,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
