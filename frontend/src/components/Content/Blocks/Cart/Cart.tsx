import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { normalize_count_form } from 'utils/normalizeWordsForm';
import { formatNumber } from 'utils/formatNumbers';

import {
	clearCart,
	setCartModalStatus,
	setOrderModalStatus,
} from 'redux/cart/slice';

import AddToCartCalcform from 'components/Content/Elements/Buttons/AddToCartCalcform';
import DeleteFromCartBtn from 'components/Content/Elements/Buttons/DeleteFromCartBtn';

import styles from './Cart.module.scss';
import { SelectCart } from 'redux/cart/selectors';
import { useAppDispatch } from 'redux/store';
import { clearCartInProfile, fetchCartInProfile } from 'redux/cart/thunks';
import { SelectAuth } from 'redux/auth/selectors';
import { CardTypeInCart } from 'redux/cart/types';
import { token } from 'utils/localStorage/initial';

const Cart: React.FC = () => {
	const dispatch = useAppDispatch();
	const { user, isLogged } = useSelector(SelectAuth);
	const { itemsInCart, totalPrice, totalSalePrice, totalCount, cartInProfile } =
		useSelector(SelectCart);
	const [currentArrayInCart, setCurrentArrayInCart] = useState<
		CardTypeInCart[]
	>([]);
	const [currentPrice, setCurrentPrice] = useState<number>();
	const [currentSalePrice, setCurrentSalePrice] = useState<number>();
	const [currentCount, setCurrentCount] = useState<number>();

	const userCart: any = localStorage.getItem('userCart');

	const sumCountInProfileCart = () => {
		const parsedUserCart: any = JSON.parse(userCart);
		let totalSum = 0;
		parsedUserCart?.forEach(item => {
			totalSum += item.count;
		});
		return totalSum;
	};

	const sumPriceInProfileCart = () => {
		const parsedUserCart: any = JSON.parse(userCart);
		let totalSum = 0;
		parsedUserCart?.forEach(item => {
			totalSum += item.price * item.count;
		});
		return totalSum;
	};

	const sumSalePriceInProfileCart = () => {
		const parsedUserCart: any = JSON.parse(userCart);
		let totalSumSalePrice = 0;
		parsedUserCart?.forEach(item => {
			totalSumSalePrice += item.salePrice * item.count;
		});
		return totalSumSalePrice;
	};

	useEffect(() => {
		// dispatch(fetchCartInProfile(token));
	}, []);

	useEffect(() => {
		dispatch(setCartModalStatus(false));
		if (isLogged) {
			setCurrentArrayInCart(cartInProfile);
			setCurrentPrice(sumPriceInProfileCart());
			setCurrentSalePrice(sumSalePriceInProfileCart());
			setCurrentCount(sumCountInProfileCart());
		} else {
			setCurrentArrayInCart(itemsInCart);
			setCurrentPrice(totalPrice);
			setCurrentSalePrice(totalSalePrice);
			setCurrentCount(totalCount);
		}
	}, [userCart]);

	const onClickOrder = () => {
		dispatch(setOrderModalStatus(true));
	};

	const onClickClear = () => {
		if (isLogged) {
			dispatch(clearCartInProfile(user.user.id));
			localStorage.removeItem('userCart');
		} else {
			dispatch(clearCart());
			localStorage.removeItem('cart');
		}
		// window.location.reload();
	};

	return (
		<>
			<div className={styles.cart}>
				{currentArrayInCart?.length > 0 ? (
					<div className={styles.cart__inner}>
						<div className={styles.cart__left}>
							<div className={styles.cart__title}>
								Корзина
								<span>
									{currentCount && currentCount}{' '}
									{currentCount && normalize_count_form(currentCount)}
								</span>
							</div>
							<div
								className={styles.cart__clearbtn}
								onClick={() => onClickClear()}
							>
								Очистить корзину
							</div>
							<div className={styles.cart__items}>
								{currentArrayInCart.map((item, index) => (
									<div className={styles.cart__item} key={index}>
										<Link
											className={styles.cart__item_image}
											to={`/product/${item.productId}`}
										>
											<img
												src={window.location.origin + item.imageUrl}
												alt='alt'
											/>
										</Link>
										<div className={styles.cart__item_info}>
											<Link
												className={styles.cart__item_name}
												to={`/product/${item.productId}`}
											>
												{item.name}
											</Link>
											<div className={styles.cart__item_calcbox}>
												<AddToCartCalcform item={item} />
												<DeleteFromCartBtn item={item} />
											</div>
										</div>
										<div className={styles.cart__item_total}>
											<div className={styles.cart__item_totalsaleprice}>
												{formatNumber(item.currentTotalSalePrice)} ₽
											</div>
											<div className={styles.cart__item_totalprice}>
												{formatNumber(item.currentTotalPrice)} ₽
											</div>
											<div className={styles.cart__item_priceforone}>
												{formatNumber(item.salePrice)} ₽ за 1 шт
											</div>
										</div>
									</div>
								))}
							</div>
						</div>
						<div className={styles.cart__right}>
							<div className={styles.cart__title}>Общая стоимость</div>
							<div className={styles.cart__results}>
								<div className={styles.cart__profit}>
									<div className={styles.cart__profit_text}>
										{currentCount}{' '}
										{currentCount && normalize_count_form(currentCount)}
									</div>
									<div className={styles.cart__profit_price}>
										{currentPrice &&
											formatNumber(
												isLogged ? sumPriceInProfileCart() : currentPrice
											)}{' '}
										₽
									</div>
								</div>
								<div className={styles.cart__profit}>
									<div className={styles.cart__profit_text}>Скидка</div>
									<div className={styles.cart__profit_profitprice}>
										{currentPrice &&
											currentSalePrice &&
											formatNumber(
												isLogged
													? sumPriceInProfileCart() -
															sumSalePriceInProfileCart()
													: currentPrice - currentSalePrice
											)}{' '}
										₽
									</div>
								</div>
								<div className={styles.cart__result}>
									<div className={styles.cart__result_text}>Итого</div>
									{/* @ts-ignore */}
									<div className={styles.cart__result_price}>
										{formatNumber(
											isLogged ? sumSalePriceInProfileCart() : totalSalePrice
										)}{' '}
										₽
									</div>
								</div>
								<div
									className={styles.cart__orderbtn}
									onClick={() => onClickOrder()}
								>
									Оформить
								</div>
							</div>
						</div>
					</div>
				) : (
					<div className={styles.cart__inner}>
						<div className={styles.cart__left}>
							<div className={styles.cart__title}>Корзина</div>
							<div className={styles.cart__items}>
								У вас нет добавленных в корзину товаров!
							</div>
						</div>
					</div>
				)}
			</div>
		</>
	);
};

export default Cart;
