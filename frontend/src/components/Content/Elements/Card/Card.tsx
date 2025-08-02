import { SelectAuth } from '@/redux/auth/selectors';
import { formatNumber } from '@/utils/formatNumbers';
import { OnClickAddToCart } from '@/utils/onClickAddToCart';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import StarRating from '../StarRating/StarRating';
import styles from './Card.module.scss';

type CardPropsType = {
	obj: any;
};

const Card: React.FC<CardPropsType> = ({ obj }) => {
	const url = typeof window !== 'undefined' ? window.location.href : '';
	let urlPath = url.includes('catalog');
	const { isLogged } = useSelector(SelectAuth);

	return (
		<div className={urlPath ? styles.news__card_catalog : styles.news__card}>
			<div
				className={`${styles.card__image} ${styles.news__card_image}`}
				style={{ backgroundImage: 'url(' + obj.imageUrl + ')' }}
			>
				<div className={styles.news__card_image_circle}>акция</div>
				<Link className={styles.news__card_view} to={`/product/${obj.id}`}>
					смотреть
				</Link>
				{isLogged && (
					<button
						className={`${styles.card__form_button} ${styles.news__card_button}`}
						onClick={() => OnClickAddToCart(obj)}
					>
						<i
							className={`${styles.card__form_button_icon} icon_shopping_basket`}
						></i>
						в корзину
					</button>
				)}
			</div>
			<div className={`${styles.card__info} ${styles.news__card_info}`}>
				<Link className={styles.card__info_title} to={`/product/${obj.id}`}>
					{obj.name}
				</Link>
				<div className={styles.card__info_text}>{obj.art}</div>
				<div className={styles.card__info_rate}>
					<StarRating rating={obj.rating} editValue={false} />
					<span>{obj.rating}</span>
				</div>
				<div className={styles.card__info_links}>
					<div
						className={`${styles.card__links_price} ${styles.news__card_links_price}`}
					>
						<p>{formatNumber(obj.price)} р</p>
						<span
							className={`${styles.card__links_price_span} ${styles.news__card_links_price_span}`}
						>
							{formatNumber(obj.salePrice)} р
						</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Card;
