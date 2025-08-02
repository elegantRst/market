import Slider, { type Settings } from 'react-slick';
import { useState } from 'react';
import styles from './SliderProduct.module.scss';
import LightboxModal from '@/components/Content/Elements/LightboxModal/LightboxModal';
import type { ProductType } from '@/redux/getProducts/types';

type SliderProductPropsType = {
	findProduct: ProductType;
};

const SliderProduct: React.FC<SliderProductPropsType> = ({ findProduct }) => {
	const countToShow = 4;

	const settings1: Settings = {
		slidesToShow: 1,
		slidesToScroll: 1,
		lazyLoad: 'ondemand',
		infinite: true,
		arrows: false,
		fade: true,
	};

	const settings2: Settings = {
		slidesToShow:
			(findProduct.slides?.length || 0) <= countToShow
				? findProduct.slides?.length || 1
				: countToShow,
		slidesToScroll: 1,
		lazyLoad: 'ondemand',
		infinite: true,
	};

	const [nav1, setNav1] = useState<Slider | null>(null);
	const [nav2, setNav2] = useState<Slider | null>(null);
	const [clickedImage, setClickedImage] = useState<string | null>(null);
	const [clickedImageIndex, setClickedImageIndex] = useState(0);

	const imageClick = (item: string, index: number) => {
		setClickedImage(item);
		setClickedImageIndex(index);
	};

	const imagePrev = () => {
		const totalLength = findProduct.slides?.length;
		if (!totalLength) return 0;
		if (!findProduct.slides) return;
		const newIndex =
			clickedImageIndex === 0 ? totalLength - 1 : clickedImageIndex - 1;
		setClickedImage(findProduct.slides[newIndex]);
		setClickedImageIndex(newIndex);
	};

	const imageNext = () => {
		const totalLength = findProduct.slides?.length;
		if (!totalLength) return 0;
		if (!findProduct.slides) return;
		const newIndex = (clickedImageIndex + 1) % totalLength;
		setClickedImage(findProduct.slides[newIndex]);
		setClickedImageIndex(newIndex);
	};

	return (
		<>
			<Slider
				className='product_info__images_image'
				{...settings1}
				asNavFor={nav2 ?? undefined}
				ref={slider1 => setNav1(slider1)}
			>
				{findProduct.slides?.map((item, index) => (
					<div
						className={styles.product_info__images_image}
						key={index}
						onClick={() => imageClick(item, index)}
					>
						<img src={item} alt='изображение товара' />
						<span className={styles.product_info__image_expand}></span>
					</div>
				))}
			</Slider>

			<Slider
				className='product_info__images_slider'
				{...settings2}
				asNavFor={nav1 ?? undefined}
				ref={slider2 => setNav2(slider2)}
			>
				{findProduct.slides?.map((item, index) => (
					<div
						className={styles.product_info__images_slide}
						key={index}
						onClick={() => imageClick(item, index)}
					>
						<img src={item} alt='миниатюра' />
					</div>
				))}
			</Slider>

			{clickedImage && (
				<LightboxModal
					clickedImage={clickedImage}
					imageNext={imageNext}
					imagePrev={imagePrev}
					setClickedImage={setClickedImage}
				/>
			)}
		</>
	);
};

export default SliderProduct;
