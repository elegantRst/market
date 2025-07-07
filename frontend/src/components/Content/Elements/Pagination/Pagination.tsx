import ReactPaginate from 'react-paginate';
import { useSelector } from 'react-redux';

import { setCurrentPage } from 'redux/filters/slice';

import { SelectFilters } from 'redux/filters/selectors';
import { reviewsLimitOnPage } from 'redux/getReview/consts';
import { SelectReviews } from 'redux/getReview/selectors';
import { useAppDispatch } from 'redux/store';
import styles from './Pagination.module.scss';
import { SelectGetProducts } from 'redux/getProducts/selectors';

type PaginationProps = {
	type: string;
};

const Pagination: React.FC<PaginationProps> = ({ type }) => {
	const dispatch = useAppDispatch();
	const { currentPage, activeShow } = useSelector(SelectFilters);
	const { productsCount } = useSelector(SelectGetProducts);
	const { reviewsInProfile } = useSelector(SelectReviews);

	const pages =
		type === 'products'
			? Math.ceil(productsCount / activeShow)
			: Math.ceil(reviewsInProfile.length / reviewsLimitOnPage);

	const onClickPageChange = (event: { selected: number }) => {
		dispatch(setCurrentPage(event.selected + 1));
	};

	return (
		<>
			{pages > 1 ? (
				<ReactPaginate
					forcePage={currentPage - 1}
					className={styles.pagination}
					breakLabel='...'
					nextLabel='>'
					onPageChange={event => onClickPageChange(event)}
					pageRangeDisplayed={3}
					pageCount={pages}
					previousLabel='<'
				/>
			) : (
				''
			)}
		</>
	);
};

export default Pagination;
