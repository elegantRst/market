import SliderSave from './SliderSave/SliderSave';
import SliderHot from './SliderHot/SliderHot';
import { useSelector } from 'react-redux';

const Sliders = () => {
	const { statusAll } = useSelector(state => state.products);

	return (
		<>
			{statusAll === 'LOADING' ? (
				'Идёт загрузка!'
			) : (
				<section className='sliders'>
					<div
						className='sliders__inner'
						data-aos='fade-up'
						data-aos-duration='500'
					>
						<SliderSave />
						<SliderHot />
					</div>
				</section>
			)}
		</>
	);
};

export default Sliders;
