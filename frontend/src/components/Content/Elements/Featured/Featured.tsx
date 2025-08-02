import { SelectGetProducts } from '@/redux/getProducts/selectors';
import { formatNumber } from '@/utils/formatNumbers';
import { OnClickAddToCart } from '@/utils/onClickAddToCart';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styles from './Featured.module.scss';

const Featured = () => {
	const { productsAll } = useSelector(SelectGetProducts);

	const findItems = productsAll?.filter(item => item.featured);

	return (
		<div className={styles.products__aside_featured}>
			<div className={styles.products__featured_title}>Популярное</div>
			<div className={styles.products__featured_inner}>
				{findItems.map((item: any, index: number) => (
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
								onClick={() => OnClickAddToCart(item)}
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
