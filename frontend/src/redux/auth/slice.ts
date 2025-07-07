import { createSlice } from '@reduxjs/toolkit';
import { getUserFromLs } from 'utils/authLS/getUserFromLS';
import { AuthSliceState } from './types';
import { Success } from 'errors';
import { getUser, loginUser, registerUser } from './thunks';

const { user } = getUserFromLs();

const initialState: AuthSliceState = {
	user: user,
	isLogged: Object.keys(user).length !== 0,
	registerModalStatus: false,
	loginModalStatus: false,
	requestError: '',
	isLoading: false,
};

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		logout(state) {
			state.isLogged = false;
			localStorage.removeItem('user');
			localStorage.removeItem('userCart');
			localStorage.removeItem('userReviews');
		},
		setRegisterModalStatus(state, action) {
			state.registerModalStatus = action.payload;
		},
		setLoginModalStatus(state, action) {
			state.loginModalStatus = action.payload;
		},
		setRequestError(state, action) {
			state.requestError = action.payload;
		},
	},
	extraReducers: builder => {
		builder.addCase(loginUser.pending, state => {
			state.isLogged = false;
			state.isLoading = true;
		});
		builder.addCase(loginUser.fulfilled, (state, action) => {
			if (action.payload.user) {
				state.user = action.payload;
				state.requestError = Success.successLogin;
				state.isLogged = true;
				state.isLoading = false;
			} else {
				state.requestError = action.payload;
				state.isLoading = false;
			}
		});
		builder.addCase(loginUser.rejected, state => {
			state.isLogged = false;
			state.isLoading = false;
		});

		builder.addCase(registerUser.pending, state => {
			state.isLogged = false;
			state.isLoading = true;
		});
		builder.addCase(registerUser.fulfilled, state => {
			state.isLogged = true;
			state.isLoading = false;
		});
		builder.addCase(registerUser.rejected, state => {
			state.isLogged = false;
			state.isLoading = false;
		});

		builder.addCase(getUser.fulfilled, (state, action) => {
			state.user = action.payload;
		});
	},
});

export const {
	logout,
	setRegisterModalStatus,
	setLoginModalStatus,
	setRequestError,
} = authSlice.actions;

export default authSlice.reducer;
