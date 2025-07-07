import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

import { ProductType, Status } from 'redux/getProducts/types';
import { SelectReviews } from 'redux/getReview/selectors';
import { getDate, getTime } from 'utils/getDateTime';

import styles from './Review.module.scss';

import { AlertColor } from '@mui/material';
import Alert from 'components/Content/Elements/AlertComponent/AlertComponent';
import Pagination from 'components/Content/Elements/Pagination/Pagination';
import StarRating from 'components/Content/Elements/StarRating/StarRating';
import { useEffect, useState } from 'react';
import { SelectAuth } from 'redux/auth/selectors';
import { setLoginModalStatus } from 'redux/auth/slice';
import { SelectFilters } from 'redux/filters/selectors';
import { setCurrentPage } from 'redux/filters/slice';
import {
	fetchReviews,
	pushReview,
	pushReviewInProfile,
} from 'redux/getReview/thunks';
import { ReviewType } from 'redux/getReview/types';
import {
	ntfMessageAddNewReview,
	ntfTypeAddNewReview,
} from 'redux/notification/consts';
import { useAppDispatch } from 'redux/store';
import { DispatchNotification } from 'utils/notificationDispatch';
import ReviewItem from './ReviewItem';

type ReviewsProps = {
	findProduct: ProductType;
};

const Reviews: React.FC<ReviewsProps> = ({ findProduct }) => {
	const dispatch = useAppDispatch();
	const [open, setOpen] = useState(false);
	const [severity, setSeverity] = useState<AlertColor>('success');
	const { reviewRating, reviews, status } = useSelector(SelectReviews);
	const { isLogged } = useSelector(SelectAuth);
	const { currentPage } = useSelector(SelectFilters);

	const {
		register,
		formState: { errors },
		handleSubmit,
		reset,
	} = useForm({
		mode: 'onBlur',
	});

	useEffect(() => {
		dispatch(setCurrentPage(1));
	}, []);

	useEffect(() => {
		dispatch(fetchReviews({ currentPage }));
	}, [currentPage]);

	const onSubmit = async (data: any) => {
		try {
			const body = { ...data };
			const date = getDate();
			const time = getTime();
			const newReview = {
				productId: findProduct.id,
				date,
				time,
				rating: reviewRating,
				feedbackEmail: body.feedbackEmail,
				feedbackName: body.feedbackName,
				feedbackMessage: body.feedbackMessage,
			};
			await dispatch(pushReview(newReview));
			await dispatch(pushReviewInProfile(newReview));
			DispatchNotification(
				true,
				findProduct,
				ntfMessageAddNewReview,
				ntfTypeAddNewReview
			);
			setOpen(true);
			setSeverity('success');
			setTimeout(() => {
				setOpen(false);
				// window.location.reload();
			}, 2000);
		} catch (error) {
			setOpen(true);
			setSeverity('error');
		}
	};

	const filterBy =
		status === Status.SUCCESS
			? (reviews: ReviewType[], field: string, value: number) => {
					return Object.values(reviews).filter(
						(item: ReviewType) => item[field] === value
					);
			  }
			: null;
	const resultReviews: ReviewType[] | null = filterBy
		? filterBy(reviews, 'productId', findProduct.id)
		: [];

	const Login = () => {
		dispatch(setLoginModalStatus(true));
	};

	return (
		<>
			<section className={styles.product_review} id='reviews'>
				<div className='title_head'>
					<h2 className='title_head__title'>Отзывы</h2>
				</div>
				<div className={styles.product_review__inner}>
					{resultReviews?.length > 0 ? (
						<div className={styles.product_review__items}>
							{resultReviews.map((item: ReviewType, index: number) => (
								<ReviewItem item={item} key={index} ix={index} />
							))}
						</div>
					) : (
						<p className={styles.product_review__inner_text}>
							Нет никаких отзывов на этот продукт.
						</p>
					)}
					<Pagination type='reviews' />
					{isLogged ? (
						<form
							className={styles.product_review__inner_form}
							onSubmit={handleSubmit(onSubmit)}
						>
							<div className={styles.product_review__inner_title}>
								Добавить ваш отзыв
							</div>
							<div className={styles.product_review__inner_ratebox}>
								<p className={styles.product_review__inner_text}>Рейтинг</p>
								<StarRating rating={reviewRating} editValue={true} />
							</div>
							<div className={styles.product_review__form_box}>
								<textarea
									className={styles.product_review__form_textarea}
									placeholder='Напишите ваш отзыв...'
									{...register('feedbackMessage')}
								></textarea>
								<input
									className={styles.product_review__form_name}
									type='text'
									placeholder='Ваше имя ...'
									{...register('feedbackName', {
										required: 'Поле имя обязательно к заполнению',
										minLength: { value: 5, message: 'Минимум 5 символов' },
									})}
								/>
								<input
									className={styles.product_review__form_email}
									type='email'
									placeholder='Ваш email ...'
									{...register('feedbackEmail', {
										required: 'Поле email обязательно к заполнению',
									})}
								/>
								<button
									className={styles.product_review__form_button}
									type='submit'
								>
									Отправить
								</button>
							</div>
							<div className={styles.product_review__form_errors}>
								{errors.feedbackName && (
									<p>
										{typeof errors.feedbackName.message === 'string'
											? errors.feedbackName.message
											: 'Обязательно заполните имя'}
									</p>
								)}

								{errors.feedbackEmail && (
									<p>
										{typeof errors.feedbackEmail.message === 'string'
											? errors.feedbackEmail.message
											: 'Обязательно заполните email'}
									</p>
								)}
							</div>
						</form>
					) : (
						<>
							<p className={styles.isNoLogged}>
								Выполните вход, для того чтобы оставить ваш отзыв.
							</p>
							<button className={styles.login} onClick={() => Login()}>
								Войти
							</button>
						</>
					)}
				</div>
			</section>
			<Alert open={open} severity={severity} text='Отзыв добавлен успешно!' />
		</>
	);
};

export default Reviews;
