import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { addItemInCart } from 'redux/cart/slice';
import { formatNumber } from 'utils/formatNumbers';
import styles from './Featured.module.scss';

const Featured = () => {
	const dispath = useDispatch();

	const { productsAll } = useSelector(state => state.products);

	const findItems = productsAll?.filter(item => {
		if (item.featured) {
			return item;
		}
	});

	const onClickAddToCard = item => {
		dispath(addItemInCart({ ...item }));
	};

	return (
		<div className={styles.products__aside_featured}>
			<div className={styles.products__featured_title}>Популярное</div>
			<div className={styles.products__featured_inner}>
				{findItems.map((item, index) => (
					<div className={styles.products__featured_item} key={index}>
						<div className={styles.products__featured_image}>
							<img src={item.imageUrl} alt='alt' />
						</div>
						<div className={styles.products__featured_info}>
							<Link
								className={styles.products__featured_name}
								to={`/product/${item.id}`}
							>
								{item.name}
							</Link>
							<div className={styles.products__featured_price}>
								{formatNumber(item.salePrice)}р
							</div>
							<div className={styles.products__featured_rate}></div>
							<div
								className={styles.products__featured_button}
								onClick={() => onClickAddToCard(item)}
							>
								В корзину
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default Featured;
