import { addItemInCart, minusItemInCart } from 'redux/cart/slice';

import styles from './Buttons.module.scss';
import { CardTypeInCart } from 'redux/cart/types';
import { useAppDispatch } from 'redux/store';
import { useSelector } from 'react-redux';
import { SelectNotification } from 'redux/notification/selectors';
import { useEffect, useRef } from 'react';
import { DispatchNotification } from 'utils/notificationDispatch';
import {
	ntfMessageMinusFromCart,
	ntfMessagePlusToCart,
	ntfTypeMinusFromCart,
	ntfTypePlusToCart,
} from 'redux/notification/consts';
import { SelectAuth } from 'redux/auth/selectors';
import {
	minusCartItemToProfile,
	plusCartItemToProfile,
} from 'redux/cart/thunks';

type AddToCartCalcformProps = {
	item: CardTypeInCart;
};

const AddToCartCalcform: React.FC<AddToCartCalcformProps> = ({ item }) => {
	const dispatch = useAppDispatch();
	const { notificationInfo } = useSelector(SelectNotification);
	const { isLogged } = useSelector(SelectAuth);
	const isMounted = useRef(false);

	const itemForCart = {
		productId: item.productId,
		imageUrl: item.imageUrl,
		name: item.name,
		price: item.price,
		salePrice: item.salePrice,
		count: item.count,
		currentTotalPrice: item.currentTotalPrice,
		currentTotalSalePrice: item.currentTotalSalePrice,
	};

	useEffect(() => {
		if (isMounted.current) {
			const notificationInfoJSON = JSON.stringify(notificationInfo);
			localStorage.setItem('notification', notificationInfoJSON);
		}
		isMounted.current = true;
	}, [notificationInfo]);

	const minusItem = (item: CardTypeInCart) => {
		if (item.count > 1) {
			if (isLogged) {
				dispatch(minusCartItemToProfile(itemForCart));
				DispatchNotification(
					true,
					itemForCart,
					ntfMessageMinusFromCart,
					ntfTypeMinusFromCart
				);
				// window.location.reload();
			} else {
				dispatch(minusItemInCart({ ...item }));
				DispatchNotification(
					true,
					itemForCart,
					ntfMessageMinusFromCart,
					ntfTypeMinusFromCart
				);
			}
		}
	};

	const plusItem = (item: CardTypeInCart) => {
		if (isLogged) {
			dispatch(plusCartItemToProfile(itemForCart));
			DispatchNotification(
				true,
				itemForCart,
				ntfMessagePlusToCart,
				ntfTypePlusToCart
			);
			// window.location.reload();
		} else {
			dispatch(addItemInCart({ ...item }));
			DispatchNotification(
				true,
				itemForCart,
				ntfMessagePlusToCart,
				ntfTypePlusToCart
			);
		}
	};

	return (
		<div className={styles.cart__item_calc}>
			<button
				className={styles.cart__item_minus}
				onClick={() => minusItem(item)}
				disabled={item.count > 1 ? false : true}
			>
				-
			</button>
			<div className={styles.cart__item_count}>{item.count}</div>
			<button className={styles.cart__item_plus} onClick={() => plusItem(item)}>
				+
			</button>
		</div>
	);
};

export default AddToCartCalcform;
