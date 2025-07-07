import { useRef } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import logo2 from "../../../assets/images/logo2.png";

import styles from "../Header.module.scss";
import { useEffect } from "react";
import HeaderProfile from "../HeaderProfile/HeaderProfile";
import { SelectCart } from "redux/cart/selectors";
import { SelectAuth } from "redux/auth/selectors";

const HeaderSettings: React.FC = () => {
  const { isLogged } = useSelector(SelectAuth);
  const { totalCount, itemsInCart, cartInProfile, totalCountInProfile } = useSelector(SelectCart);
  const isMountedCart = useRef(false);
  const isMountedCart2 = useRef(false);

  useEffect(() => {
    if (isMountedCart2.current) {
      const jsonCartInProfile = JSON.stringify(cartInProfile);
      localStorage.setItem("userCart", jsonCartInProfile);
    }
    isMountedCart2.current = true;
  }, [totalCountInProfile, cartInProfile]);

  useEffect(() => {
    if (isMountedCart.current) {
      const jsonCart = JSON.stringify(itemsInCart);
      localStorage.setItem("cart", jsonCart);
    }
    isMountedCart.current = true;
  }, [totalCount, itemsInCart]);

  const userCart: any = localStorage.getItem("userCart");

  const sumCountInProfileCart = () => {
    const parsedUserCart: any = JSON.parse(userCart);
    let totalSum = 0;
    if (Array.isArray(parsedUserCart)) {
      parsedUserCart.forEach((item) => {
        totalSum += item.count;
      });
    }
    return totalSum;
  };

  return (
    <div className={styles.header__settings}>
      <div className="container">
        <div className={styles.header__settings_inner}>
          <Link className={styles.header__settings_logo} to="/">
            <img src={logo2} alt="alt" />
          </Link>
          <div className={styles.header__settings_time}>
            <span className={styles.header__settings_time_span}>Пн-Пт:</span> 9:00-20:00
          </div>
          <a className={styles.header__settings_email} href="mailto:albero_mebel@mail.ru">
            albero_mebel@mail.ru
          </a>
          <div className={styles.header__setting_user}>
            <HeaderProfile />
            <Link className={styles.header__settings_cart} to="/cart" data-aos="fade-left" data-aos-duration="1000" data-aos-delay="1000">
              <i className={`${styles.header__settings_cart_icon} icon_shopping_basket`} data-aos="fade-left" data-aos-duration="1000" data-aos-delay="1500"></i>
              <div className={styles.header__settings_cart_count} data-aos="fade-left" data-aos-duration="1000" data-aos-delay="1800">
                {isLogged ? sumCountInProfileCart() : totalCount}
              </div>
            </Link>
          </div>
          <div className={styles.header__settings_image_inner}>
            <i className={`${styles.header__settings_image_icon} icon_angle_left`} data-aos="fade-left" data-aos-duration="1000" data-aos-delay="2000"></i>
            <i className={`${styles.header__settings_image_icon} icon_angle_left`} data-aos="fade-left" data-aos-duration="1000" data-aos-delay="2100"></i>
            <i className={`${styles.header__settings_image_icon} icon_angle_left`} data-aos="fade-left" data-aos-duration="1000" data-aos-delay="2200"></i>
            <i className={`${styles.header__settings_image_icon} icon_angle_left`} data-aos="fade-left" data-aos-duration="1000" data-aos-delay="2250"></i>
            <i className={`${styles.header__settings_image_icon} icon_angle_left`} data-aos="fade-left" data-aos-duration="1000" data-aos-delay="2300"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderSettings;
