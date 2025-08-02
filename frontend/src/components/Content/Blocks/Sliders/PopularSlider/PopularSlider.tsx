import Card from '@/components/Content/Elements/Card/Card';
import Slider from 'react-slick';
import styles from './Popular.module.scss';
import { SelectGetProducts } from '@/redux/getProducts/selectors';
import { useSelector } from 'react-redux';
import type { ProductType } from '@/redux/getProducts/types';

type PopularSliderPropsType = {
	category: number;
};

const PopularSlider: React.FC<PopularSliderPropsType> = ({ category }) => {
	const { productsAll } = useSelector(SelectGetProducts);

	const filterBy = (productsAll: ProductType[], field: any, value: any) => {
		return productsAll.filter(
			(item: ProductType) => item[field as keyof ProductType] === value
		);
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
