import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';

import { Status } from 'redux/getProducts/types';
import { SelectReviews } from 'redux/getReview/selectors';

import styles from './Feedback.module.scss';

import StarRating from 'components/Content/Elements/StarRating/StarRating';
import { useEffect } from 'react';
import { fetchAllReviews } from 'redux/getReview/thunks';
import { useAppDispatch } from 'redux/store';
import { SelectGetProducts } from 'redux/getProducts/selectors';

const Feedback = () => {
	const dispatch = useAppDispatch();
	const { reviewsAll, statusAll } = useSelector(SelectReviews);
	const { productsAll } = useSelector(SelectGetProducts);

	useEffect(() => {
		// dispatch(fetchAllReviews());
	}, [dispatch]);

	const settings = {
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: false,
		dots: true,
		autoplay: true,
		autoplaySpeed: 5000,
		cssEase: 'ease-out',
	};

	const findProductFunc = (id: number) => {
		const findProduct = productsAll?.find(product => {
			return product?.id === id;
		});
		return (
			<div className={styles.feedback__item_product_wrapper}>
				<img
					className={styles.feedback__item_product_image}
					src={findProduct?.imageUrl}
					alt='alt'
				/>
				<div className={styles.feedback__item_product_name}>
					{findProduct?.name}
				</div>
			</div>
		);
	};

	return (
		<section className='feedback'>
			<div className='title_head'>
				<h2 className='title_head__title'>Отзывы наших клиентов</h2>
			</div>
			{statusAll === Status.LOADING ? (
				'Идёт загрузка!'
			) : (
				<Slider className='feedback__slider' {...settings}>
					{reviewsAll.map((item, index) => {
						if (index <= 9) {
							return (
								<div className={styles.feedback__item} key={index}>
									<div className={styles.feedback__item_box}>
										<div className={styles.feedback__item_text}>
											{item?.feedbackMessage}
										</div>
										<div className={styles.feedback__item_author}>
											<div className={styles.feedback__item_author_info}>
												<div className={styles.feedback__item_author_rating}>
													<StarRating rating={item?.rating} editValue={false} />
												</div>
												<div className={styles.feedback__item_author_name}>
													{item?.feedbackName}
												</div>
												<div className={styles.feedback__item_author_date}>
													{item?.date}
												</div>
											</div>
										</div>
									</div>
									<Link
										className={styles.feedback__item_product}
										to={`/product/${item?.productId}`}
									>
										{findProductFunc(item?.productId)}
									</Link>
								</div>
							);
						}
					})}
				</Slider>
			)}
		</section>
	);
};

export default Feedback;
