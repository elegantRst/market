import { createSlice } from '@reduxjs/toolkit';
import { Status } from 'redux/getProducts/types';
import { fetchBlog } from './thunks';
import { BlogSliceState } from './types';

const initialState: BlogSliceState = {
	posts: [],
	status: Status.LOADING,
};

const getBlogSlice = createSlice({
	name: 'blog',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder.addCase(fetchBlog.pending, state => {
			state.status = Status.LOADING;
			state.posts = [];
		});
		builder.addCase(fetchBlog.fulfilled, (state, action) => {
			state.status = Status.SUCCESS;
			state.posts = action.payload.data;
		});
		builder.addCase(fetchBlog.rejected, state => {
			state.status = Status.ERROR;
			state.posts = [];
		});
	},
});

export default getBlogSlice.reducer;
