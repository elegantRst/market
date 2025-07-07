import { createSlice } from '@reduxjs/toolkit';
import { Status } from 'redux/getProducts/types';
import { getGraphics } from './thunks';
import { getGraphicsSliceState } from './types';

const initialState: getGraphicsSliceState = {
	status: Status.LOADING,
	favorites: [],
};

export const getGraphicsSlice = createSlice({
	name: 'getGraphics',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder.addCase(getGraphics.pending, state => {
			state.status = Status.LOADING;
		});
		builder.addCase(getGraphics.fulfilled, (state, action) => {
			state.favorites = action.payload.data;
			state.status = Status.SUCCESS;
		});
		builder.addCase(getGraphics.rejected, state => {
			state.status = Status.ERROR;
		});
	},
});

export const {} = getGraphicsSlice.actions;

export default getGraphicsSlice.reducer;
