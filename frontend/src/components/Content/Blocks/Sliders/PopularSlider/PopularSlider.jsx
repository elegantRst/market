import React from 'react';

import Slider from 'react-slick';

import styles from './Popular.module.scss';
import Card from 'components/Content/Elements/Card/Card';

const PopularSlider = ({ productsAll, category }) => {
	const filterBy = (productsAll, field, value) => {
		return productsAll.filter(item => item[field] === value);
	};
	const cards = filterBy(productsAll, 'category', category);

	const settings = {
		slidesToShow: 4,
		slidesToScroll: 4,
		arrows: false,
		dots: true,
		autoplay: true,
		autoplaySpeed: 3500,
		cssEase: 'ease-out',
		responsive: [
			{
				breakpoint: 1251,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 3,
					variableWidth: false,
				},
			},
			{
				breakpoint: 801,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2,
					variableWidth: false,
				},
			},
			{
				breakpoint: 551,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					variableWidth: false,
				},
			},
		],
	};
	return (
		<section className={styles.popular}>
			<div className='title_head'>
				<h2 className='title_head__title'>Популярное</h2>
			</div>
			<Slider className='popular__slider' {...settings}>
				{cards.map(obj => (
					<Card obj={obj} key={obj.id} />
				))}
			</Slider>
		</section>
	);
};

export default PopularSlider;
