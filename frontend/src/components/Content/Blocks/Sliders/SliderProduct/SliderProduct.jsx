import React from "react";
import Slider from "react-slick";
import { useState } from "react";

import styles from "./SliderProduct.module.scss";
import LightboxModal from "components/Content/Elements/LightboxModal/LightboxModal";

const SliderProduct = ({ findProduct }) => {
  const countToShow = 4;
  let settings1 = {};
  let settings2 = {};
  if (findProduct.slides.length <= countToShow) {
    settings1 = {
      slidesToShow: 1,
      slidesToScroll: 1,
      lazyLoad: true,
      infinity: true,
      arrows: false,
      fade: true,
    };
    settings2 = {
      slidesToShow: findProduct.slides.length,
      slidesToScroll: 1,
      lazyLoad: true,
      infinity: true,
    };
  } else {
    settings1 = {
      slidesToShow: 1,
      slidesToScroll: 1,
      lazyLoad: true,
      infinity: true,
      arrows: false,
      fade: true,
    };
    settings2 = {
      slidesToShow: countToShow,
      slidesToScroll: 1,
      lazyLoad: true,
      infinity: true,
    };
  }

  const [nav1, setNav1] = useState();
  const [nav2, setNav2] = useState();

  const [clickedImage, setClickedImage] = useState(null);
  const [clickedImageIndex, setClickedImageIndex] = useState(null);
  const imageClick = (item, index) => {
    setClickedImage(item);
    setClickedImageIndex(index);
  };
  const imagePrev = () => {
    const totalLength = findProduct?.slides.length;
    if (clickedImageIndex === 0) {
      setClickedImageIndex(totalLength - 1);
      const newUrl = findProduct?.slides[totalLength - 1];
      setClickedImage(newUrl);
      return;
    }
    const newIndex = clickedImageIndex - 1;
    const newUrl = findProduct?.slides.filter((item) => {
      return findProduct?.slides.indexOf(item) === newIndex;
    });
    const newItem = newUrl[0];
    setClickedImage(newItem);
    setClickedImageIndex(newIndex);
  };
  const imageNext = () => {
    const totalLength = findProduct?.slides.length;
    if (clickedImageIndex + 1 >= totalLength) {
      setClickedImageIndex(0);
      const newUrl = findProduct?.slides[0];
      setClickedImage(newUrl);
      return;
    }
    const newIndex = clickedImageIndex + 1;
    const newUrl = findProduct?.slides.filter((item) => {
      return findProduct?.slides.indexOf(item) === newIndex;
    });
    const newItem = newUrl[0];
    setClickedImage(newItem);
    setClickedImageIndex(newIndex);
  };

  return (
    <>
      <Slider className="product_info__images_image" {...settings1} asNavFor={nav2} ref={(slider1) => setNav1(slider1)}>
        {findProduct?.slides.map((item, index) => (
          <div className={styles.product_info__images_image} key={index} onClick={() => imageClick(item, index)}>
            <img src={item} alt="alt" />
            <span className={styles.product_info__image_expand}></span>
          </div>
        ))}
      </Slider>
      <Slider className="product_info__images_slider" {...settings2} asNavFor={nav1} ref={(slider2) => setNav2(slider2)}>
        {findProduct?.slides.map((item, index) => (
          <div className={styles.product_info__images_slide} key={index} onClick={() => imageClick(item, index)}>
            <img src={item} alt="alt" />
          </div>
        ))}
      </Slider>
      {clickedImage && <LightboxModal clickedImage={clickedImage} imageNext={imageNext} imagePrev={imagePrev} setClickedImage={setClickedImage} />}
    </>
  );
};

export default SliderProduct;
