import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

import { SelectReviews } from 'redux/getReview/selectors';
import { formatNumber } from 'utils/formatNumbers';
import { normalize_count_form_reviews } from 'utils/normalizeWordsForm';

import styles from './ProductInfo.module.scss';

import StarRating from 'components/Content/Elements/StarRating/StarRating';
import { SelectAuth } from 'redux/auth/selectors';
import { categoriesList } from 'redux/filters/consts';
import { ReviewType } from 'redux/getReview/types';
import { OnClickAddToCart } from 'utils/onClickAddToCart';
import SliderProduct from '../Sliders/SliderProduct/SliderProduct';
import { ProductType } from 'redux/getProducts/types';

type ProductInfoProps = {
	findProduct: ProductType;
};

const ProductInfo: React.FC<ProductInfoProps> = ({ findProduct }) => {
	const { status, reviews } = useSelector(SelectReviews);
	const { isLogged } = useSelector(SelectAuth);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	const { hash, key } = useLocation();
	useEffect(() => {
		if (hash) {
			const targetElement = document.getElementById(hash.substring(1));
			targetElement?.scrollIntoView({ behavior: 'smooth' });
		}
	}, [key, hash]);

	let resultReviews = {};
	if (status === 'SUCCESS') {
		const filterBy = (reviews: ReviewType[], field: string, value: number) => {
			return reviews.filter((item: ReviewType) => item[field] === value);
		};
		resultReviews = filterBy(reviews, 'productId', findProduct.id);
	}

	return (
		<>
			<section className={styles.product_info}>
				<div className={styles.product_info__inner}>
					<div className={styles.product_info__inner_images}>
						<SliderProduct findProduct={findProduct} />
					</div>
					<div className={styles.product_info__inner_information}>
						<div className={styles.product_info__information_name_box}>
							<div className={styles.product_info__information_name}>
								{findProduct?.name}
							</div>
							<div className={styles.product_info__information_rate}>
								<StarRating rating={findProduct?.rating} editValue={false} />
							</div>
							<div className={styles.product_info__information_reviews}>
								{Object.values(resultReviews).length}{' '}
								{normalize_count_form_reviews(
									Object.values(resultReviews).length
								)}
							</div>
							<Link
								className={styles.product_info__information_addreviews}
								to='#reviews'
							>
								Добавить отзыв
							</Link>
						</div>
						<div className={styles.product_info__information_price_box}>
							<div className={styles.product_info__information_price}>
								{formatNumber(findProduct?.price)} р
								<span className={styles.product_info__information_price_span}>
									{formatNumber(findProduct?.salePrice)} р
								</span>
							</div>
						</div>
						<div className={styles.product_info__information_buy_box}>
							<button
								className={styles.product_info__card__form_button}
								type='button'
								onClick={() => OnClickAddToCart(findProduct, isLogged)}
							>
								<i className='icon_shopping_basket'></i>В корзину
							</button>
						</div>
						<div className={styles.product_info__information_text_box}>
							<div className={styles.product_info__information_text_title}>
								Описание:
							</div>
							{findProduct?.description}
						</div>
						<div className={styles.product_info__information_category_box}>
							<div className={styles.product_info__information_category_line}>
								<span
									className={styles.product_info__information_category_span}
								>
									Доступно:
								</span>
								<strong
									className={findProduct?.inStock ? styles.green : styles.red}
								>
									{findProduct?.inStock ? 'В наличии' : 'Нет в наличии'}
								</strong>
							</div>
							<div className={styles.product_info__information_category_line}>
								<span
									className={styles.product_info__information_category_span}
								>
									Категория:
								</span>
								{categoriesList[findProduct?.category]?.name}
							</div>
							<div className={styles.product_info__information_category_line}>
								<span
									className={styles.product_info__information_category_span}
								>
									Цвет:
								</span>
								<span
									className={styles.color}
									style={{ backgroundColor: `${findProduct?.color}` }}
								></span>
							</div>
						</div>
						<div className={styles.product_info__information_socials_box}>
							<a
								className={`${styles.product_info__information_socials_item} icon_facebook_square socials__color_facebook`}
								href='https://www.facebook.com/'
							>
								Facebook
							</a>
							<a
								className={`${styles.product_info__information_socials_item} icon_twitter_square socials__color_twitter`}
								href='https://help.twitter.com/'
							>
								Tweet
							</a>
							<a
								className={`${styles.product_info__information_socials_item} icon_linkedin_square socials__color_linkedin`}
								href='https://www.linkedin.com/'
							>
								Linkedin
							</a>
							<a
								className={`${styles.product_info__information_socials_item} icon_google_plus_square socials__color_google`}
								href='https://www.google.ru/'
							>
								Google+
							</a>
							<a
								className={`${styles.product_info__information_socials_item} icon_pinterest_square socials__color_pinterest`}
								href='https://www.pinterest.ru/'
							>
								Pinterest
							</a>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default ProductInfo;
