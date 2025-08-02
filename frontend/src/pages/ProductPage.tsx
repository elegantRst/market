import Breadcrumbs from '@/components/Content/Blocks/Breadcrumbs/Breadcrumbs';
import Feedbacks from '@/components/Content/Blocks/Feedbacks/Feedbacks';
import ProductInfo from '@/components/Content/Blocks/ProductInfo/ProductInfo';
import PopularSlider from '@/components/Content/Blocks/Sliders/PopularSlider/PopularSlider';
import Subscribe from '@/components/Content/Blocks/Subscribe/Subscribe';
import { SelectFilters } from '@/redux/filters/selectors';
import { setMenuUrlValue, setSearchModal } from '@/redux/filters/slice';
import { SelectGetProducts } from '@/redux/getProducts/selectors';
import { Status } from '@/redux/getProducts/types';
import { useAppDispatch } from '@/redux/store';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

const ProductPage = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const { productsAll, statusAll } = useSelector(SelectGetProducts);
	const { menuUrlValue } = useSelector(SelectFilters);
	const { id } = useParams();
	const findProduct = productsAll?.find(obj => obj.id === Number(id));
	const pageTitle = findProduct?.name;

	useEffect(() => {
		dispatch(setSearchModal(false));
		dispatch(setMenuUrlValue(''));
	}, [menuUrlValue, dispatch]);

	useEffect(() => {
		window.scrollTo(0, 0);
		dispatch(setSearchModal(false));
	}, [id, dispatch]);

	return (
		<>
			{statusAll === Status.LOADING ? (
				'Идёт загрузка!'
			) : (
				<>
					<Breadcrumbs pageTitle={pageTitle} />
					{findProduct ? (
						<>
							<ProductInfo findProduct={findProduct} />
							<Feedbacks findProduct={findProduct} />
							<PopularSlider category={findProduct?.category} />
						</>
					) : (
						navigate('error')
					)}
					<Subscribe />
				</>
			)}
		</>
	);
};

export default ProductPage;
