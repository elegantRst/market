import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { setMenuUrlValue, setSearchModal } from 'redux/filters/slice';
import { SelectGetProducts } from 'redux/getProducts/selectors';
import { Status } from 'redux/getProducts/types';
import { useAppDispatch } from 'redux/store';

import Breadcrumbs from 'components/Content/Blocks/Breadcrumbs/Breadcrumbs';
import ProductInfo from 'components/Content/Blocks/ProductInfo/ProductInfo';
import Reviews from 'components/Content/Blocks/Reviews/Reviews';
import PopularSlider from 'components/Content/Blocks/Sliders/PopularSlider/PopularSlider';
import Subscribe from 'components/Content/Blocks/Subscribe/Subscribe';
import { SelectFilters } from 'redux/filters/selectors';

const ProductPage = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const { productsAll, statusAll } = useSelector(SelectGetProducts);
	const { menuUrlValue } = useSelector(SelectFilters);

	const { id } = useParams();

	const findProduct =
		statusAll === Status.SUCCESS
			? productsAll?.find((obj, i: number) => {
					if (obj.id === Number(id)) {
						return productsAll[i];
					}
			  })
			: null;

	const pageTitle = findProduct?.name;

	useEffect(() => {
		dispatch(setSearchModal(false));
		dispatch(setMenuUrlValue(''));
	}, [menuUrlValue]);

	useEffect(() => {
		window.scrollTo(0, 0);
		dispatch(setSearchModal(false));
	}, [id]);

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
							<Reviews findProduct={findProduct} />
							<PopularSlider
								productsAll={productsAll}
								category={findProduct?.category}
							/>
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
