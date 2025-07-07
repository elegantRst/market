import { useState } from 'react';
import { useSelector } from 'react-redux';
import ReactSlider from 'react-slider';

import {
	formatPrice,
	localPriceFormattedMin,
	localPriceFormattedMax,
} from 'utils/formatNumbers';
import { useAppDispatch } from 'redux/store';
import { SelectFilters } from 'redux/filters/selectors';

import { setCurrentPage, setPriceMinMax } from 'redux/filters/slice';

import './FilterPrice.module.scss';
import styles from './FilterPrice.module.scss';

const FilterPrice = () => {
	const dispatch = useAppDispatch();
	const { priceMinMax } = useSelector(SelectFilters);
	const [localPrice, setLocalPrice] = useState([
		priceMinMax[0],
		priceMinMax[1],
	]);

	formatPrice(priceMinMax);

	const onClickPriceChange = (value: number[]) => {
		setLocalPrice(value);
		dispatch(setCurrentPage(1));
		dispatch(setPriceMinMax(value));
	};

	return (
		<div className={styles.products__aside_price}>
			<div className={styles.aside_title}>Фильтр по цене</div>
			<div className={styles.price_slider_box}>
				<span className={styles.value0}>{localPriceFormattedMin} р</span>
				<ReactSlider
					className='price_slider'
					thumbClassName='price_thumb'
					trackClassName='price_track'
					value={priceMinMax}
					min={0}
					max={800000}
					renderThumb={props => <div {...props}></div>}
					pearling
					minDistance={2000}
					onChange={value => onClickPriceChange(value)}
				/>
				<span className={styles.value1}>{localPriceFormattedMax} р</span>
			</div>
		</div>
	);
};

export default FilterPrice;
