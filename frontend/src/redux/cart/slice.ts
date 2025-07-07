import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { Status } from 'redux/getProducts/types';
import {
	calcTotalCount,
	calcTotalPrice,
	calcTotalSalePrice,
} from 'utils/calcCart';
import {
	getCartFromLS,
	getCartFromProfileLS,
} from 'utils/cartLS/getCartFromLS';
import { fetchCartInProfile, pushCartToProfile } from './thunks';
import { CardTypeInCart, CartSliceState } from './types';

const { itemsInCartFromLS } = getCartFromLS();
const { itemsInCartFromProfileLS } = getCartFromProfileLS();

const initialState: CartSliceState = {
	// localCart
	itemsInCart: itemsInCartFromLS,
	totalCount: calcTotalCount(itemsInCartFromLS),
	totalPrice: calcTotalPrice(itemsInCartFromLS),
	totalSalePrice: calcTotalPrice(itemsInCartFromLS),
	status: true,
	cartModalStatus: false,
	orderModalStatus: false,
	//  profileCart
	cartInProfile: itemsInCartFromProfileLS,
	totalCountInProfile: calcTotalCount(itemsInCartFromProfileLS),
	totalPriceInProfile: calcTotalPrice(itemsInCartFromProfileLS),
	totalSalePriceInProfile: calcTotalPrice(itemsInCartFromProfileLS),
	fetchCartInProfileStatus: Status.LOADING,
	postCartInProfileStatus: Status.LOADING,
};

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addItemInCart(state, action: PayloadAction<CardTypeInCart>) {
			const findItem = state.itemsInCart?.find((item: CardTypeInCart) => {
				return item.productId === action.payload.productId;
			});
			if (findItem) {
				findItem.count++;
				findItem.currentTotalPrice =
					findItem.currentTotalPrice + findItem.price;
				findItem.currentTotalSalePrice =
					findItem.currentTotalSalePrice + findItem.salePrice;
			} else {
				state.itemsInCart?.push({
					...action.payload,
					count: 1,
					currentTotalPrice: action.payload.price,
					currentTotalSalePrice: action.payload.salePrice,
				});
			}
			state.totalCount = calcTotalCount(state.itemsInCart);
			state.totalPrice = calcTotalPrice(state.itemsInCart);
			state.totalSalePrice = calcTotalSalePrice(state.itemsInCart);
			state.cartModalStatus = true;
		},
		minusItemInCart(state, action: PayloadAction<CardTypeInCart>) {
			const findItem = state.itemsInCart?.find(item => {
				return item.productId === action.payload.productId;
			});
			if (findItem && findItem.count > 1) {
				findItem.count--;
				if (state.totalPrice) {
					state.totalPrice = state.totalPrice - findItem.price;
				}
				if (state.totalSalePrice) {
					state.totalSalePrice = state.totalSalePrice - findItem.salePrice;
				}
				findItem.currentTotalPrice =
					findItem.currentTotalPrice - findItem.price;
				findItem.currentTotalSalePrice =
					findItem.currentTotalSalePrice - findItem.salePrice;
				if (state.totalCount) {
					state.totalCount = state.totalCount - 1;
				}
			}
		},
		deleteItemInCart(state, action: PayloadAction<CardTypeInCart>) {
			state.itemsInCart = state.itemsInCart?.filter(item => {
				return item.productId !== action.payload.productId;
			});
			state.totalCount = state.itemsInCart?.reduce((count, item) => {
				return item.count + count;
			}, 0);
			state.totalPrice = state.itemsInCart?.reduce((sum, item) => {
				return item.price * item.count + sum;
			}, 0);
			state.totalSalePrice = state.itemsInCart?.reduce((sum, item) => {
				return item.salePrice * item.count + sum;
			}, 0);
		},
		clearCart(state) {
			state.itemsInCart = [];
		},
		setCartModalStatus(state, action) {
			state.cartModalStatus = action.payload;
		},
		setOrderModalStatus(state, action) {
			state.orderModalStatus = action.payload;
		},
	},
	extraReducers: builder => {
		builder.addCase(fetchCartInProfile.pending, state => {
			state.fetchCartInProfileStatus = Status.LOADING;
		});
		builder.addCase(fetchCartInProfile.fulfilled, (state, action) => {
			state.fetchCartInProfileStatus = Status.SUCCESS;
			state.cartInProfile = action.payload;
		});
		builder.addCase(fetchCartInProfile.rejected, state => {
			state.fetchCartInProfileStatus = Status.ERROR;
		});

		builder.addCase(pushCartToProfile.pending, state => {
			state.postCartInProfileStatus = Status.LOADING;
		});
		builder.addCase(pushCartToProfile.fulfilled, (state, action) => {
			state.postCartInProfileStatus = Status.SUCCESS;
			state.cartInProfile = action.payload.data;
		});
		builder.addCase(pushCartToProfile.rejected, state => {
			state.postCartInProfileStatus = Status.ERROR;
		});
	},
});

export const {
	addItemInCart,
	minusItemInCart,
	deleteItemInCart,
	clearCart,
	setCartModalStatus,
	setOrderModalStatus,
} = cartSlice.actions;

export default cartSlice.reducer;
