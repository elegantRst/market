import { useEffect } from 'react';
import { useAppDispatch } from 'redux/store';

import { setMenuUrlValue } from 'redux/filters/slice';

import Banner from 'components/Content/Blocks/Banner/Banner';
import Brands from 'components/Content/Blocks/Brands/Brands';
import Breadcrumbs from 'components/Content/Blocks/Breadcrumbs/Breadcrumbs';
import Subscribe from 'components/Content/Blocks/Subscribe/Subscribe';
import Showroom from 'components/Content/Blocks/Showroom/Showroom';
import { menuList } from 'redux/filters/consts';

const ShowroomPage = () => {
	const dispatch = useAppDispatch();
	const pageTitle: string = 'Шоу-рум';

	useEffect(() => {
		window.scrollTo(0, 0);
		dispatch(setMenuUrlValue(menuList[3]));
	}, [dispatch]);
	return (
		<>
			<Banner />
			<Breadcrumbs pageTitle={pageTitle} />
			<Showroom />
			<Brands />
			<Subscribe />
		</>
	);
};

export default ShowroomPage;
