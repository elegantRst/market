import { createAsyncThunk } from '@reduxjs/toolkit';
import { instance } from 'utils/axios';

export const getGraphics = createAsyncThunk('graphics', async () => {
	try {
		const { data } = await instance.get(`/graphics/getGraphics`);
		return { data };
	} catch (error: any) {
		if (error.response && error.response.data.message) {
			return error.response.data.message;
		} else {
			return error.message;
		}
	}
});
