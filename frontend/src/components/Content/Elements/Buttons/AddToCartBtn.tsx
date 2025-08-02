import { OnClickAddToCart } from '@/utils/onClickAddToCart';
import styles from './Buttons.module.scss';

type AddToCartBtnPropsType = {
	item: any;
};

const AddToCartBtn: React.FC<AddToCartBtnPropsType> = ({ item }) => {
	return (
		<>
			<div
				className={`${styles.slide__info_link} icon_shopping_basket`}
				onClick={() => OnClickAddToCart(item)}
			></div>
		</>
	);
};

export default AddToCartBtn;
