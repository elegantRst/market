import React, { useEffect, useState } from 'react';
import { ReviewType } from 'redux/getReview/types';

import StarRating from 'components/Content/Elements/StarRating/StarRating';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import { SelectReviews } from 'redux/getReview/selectors';
import { deleteReview } from 'redux/getReview/thunks';
import {
	ntfMessageDeleteReview,
	ntfTypeDeleteReview,
} from 'redux/notification/consts';
import { useAppDispatch } from 'redux/store';
import { DispatchNotification } from 'utils/notificationDispatch';
import styles from './Review.module.scss';
import { SelectGetProducts } from 'redux/getProducts/selectors';

type ReviewItemProps = {
	item: ReviewType;
	ix: number;
	initialCountReviewToShow?: number;
};

const ReviewItem: React.FC<ReviewItemProps> = ({
	item,
	ix,
	initialCountReviewToShow,
}) => {
	const dispatch = useAppDispatch();
	const { productsAll } = useSelector(SelectGetProducts);
	const { reviewsInProfile } = useSelector(SelectReviews);
	const currentReviewProductId = item?.productId;
	const location = useLocation();
	const pathnameProduct = location.pathname.includes('product');
	const pathnameProfile = location.pathname.includes('profile');
	const findCurrentReview = reviewsInProfile.find(element => {
		return item?.id === element.id;
	});
	const findProduct = productsAll.find(item => {
		return item?.id === currentReviewProductId;
	});
	const [show, setShow] = useState(false);

	const checkIfItemIsInitial = () => {
		if (initialCountReviewToShow) {
			if (initialCountReviewToShow < ix + 1) {
				return 'itemIsNotInitial';
			} else {
				return 'itemIsInitial';
			}
		} else {
			return;
		}
	};

	const reviewDelete = () => {
		if (window.confirm('Удалить выбранный отзыв?')) {
			dispatch(deleteReview(findCurrentReview));
			DispatchNotification(
				true,
				findProduct,
				ntfMessageDeleteReview,
				ntfTypeDeleteReview
			);
			// window.location.reload();
		}
	};

	useEffect(() => {
		setShow(!show);
	}, []);

	return (
		<CSSTransition
			className={`${
				styles.product_review__item
			} ${checkIfItemIsInitial()}  alert`}
			in={show}
			timeout={300}
		>
			<div>
				<div className={styles.product_review_item_databox}>
					<div>
						<div className={styles.product_review__item_number}>
							Отзыв № {item?.id}
						</div>
						<div className={styles.product_review__item_date}>
							<span>
								<strong>Дата</strong> {item?.date}
							</span>
							<span>
								<strong>Время</strong> {item?.time}
							</span>
						</div>
					</div>
					{!pathnameProduct && (
						<Link
							className={styles.product_review__item_productId}
							to={`/product/${item?.productId}`}
						>
							<img
								className={styles.product_review__item_productImage}
								src={findProduct?.imageUrl}
								alt='image'
							/>
							<div className={styles.product_review__item_productName}>
								{findProduct?.name}
							</div>
						</Link>
					)}
				</div>
				<div className={styles.product_review_topbox}>
					<div className={styles.product_review__item_box}>
						<div className={styles.product_review__item_name}>
							{item?.feedbackName}
						</div>
						<div className={styles.product_review__item_rating}>
							{<StarRating rating={item?.rating} editValue={false} size={20} />}
						</div>
						<div className={styles.product_review__item_rating}>
							<span>({item?.rating})</span>
						</div>
					</div>
					<div className={styles.product_review__item_message}>
						{item?.feedbackMessage}
					</div>
				</div>
				{pathnameProfile && (
					<div
						className={styles.product_review_delete}
						onClick={() => reviewDelete()}
					>
						Удалить
					</div>
				)}
			</div>
		</CSSTransition>
	);
};

export default ReviewItem;
